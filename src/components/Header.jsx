import React, { useRef, useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import axios from "axios"
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";

import logo from '../assets/images/LadyBag.png'

const mainNav = [
  {
    display: 'Product',
    path: '/catalog'
  }
]

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

const Header = (props) => {
  let history = useHistory();

  const [isShown, setIsShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState(false);
  const [category, setCategory] = useState(false);
  const [shrink, setShrink] = useState(false);

  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex(e => e.path === pathname);
  const splitLocation = pathname.split("/");
  
  const url2 =`${process.env.REACT_APP_API_URL}categories`

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        setShrink(true);
      }
      else{
        setShrink(false);
      }
    })
    axios.get(url2).then((response) => {
      setCategory(response.data);
    });
    return () => {
      window.removeEventListener("scroll", null)
    };
  }, []);

  function DoSearch(e){
    e.preventDefault();

    history.push({
      pathname: '/search',
      state: {name:keyword}
    });
  }

  return (
    <div className={`header ${shrink ? `shrink` : ``}`}>
      <div className="container">
        <div className="header-menu">
          <div className="header-menu-left">
            <div className="header-menu-left-close">
              <i className='bx bx-x'></i>
            </div>
            {
              mainNav.map((item, index) => (
                <div key={index} className={`header-menu-item 
                header-menu-left ${index === activeNav ? 'active' : ''}`}>
                    <span
                      onMouseEnter={() => setIsShown(true)}
                      onMouseLeave={() => setIsShown(false)}>
                      <Link to={item.path}>
                        {item.display}
                        <div className="active" />
                      </Link>
                      {isShown && (
                          !category ?
                            <BounceLoader color='#AD0303' loading={true} css={override} size={60} />
                          :
                          <div className="header-menu-left-category">
                            {
                              category.map((item, i) => (
                                <div key={i} className="header-menu-left-category-item">
                                  <Link to={{
                                    pathname : `/catalog/${item.slug}`,
                                    state : {category_id:item.id}
                                    }}>
                                    {item.name}
                                  </Link>
                                </div>
                              ))
                            }
                          </div>
                      )}
                    </span>
                </div>
              ))
            }
          </div>
          <div className="header-logo">
            <Link to='/'>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="header-menu-right">
            <div className="header-menu-item header-menu-right-item">
              <span >
                <i className='bx bx-search' onClick={() => setOpen(true)}></i>
                {open ? 
                <div className="header-menu-right-search form-control-direction">
                  <i className='bx bx-x' onClick={() => setOpen(false)}></i>
                  <form onSubmit={DoSearch}>
                    <input 
                    placeholder="Search"
                    onChange={(e) => setKeyword(e.target.value)} />
                  </form>
                </div> : null}
              </span>
            </div>
            <div className="header-menu-item header-menu-right-item">
              {
                props.user === null ?
                <Link to ='/user/register'>
                  <i className={`bx ${splitLocation[1] === 'user' ? "bxs-user" : "bx-user"}`} ></i>
                </Link> 
                :
                <Link to ='/user'>
                  <i className={`bx ${splitLocation[1] === 'user' ? "bxs-user" : "bx-user"}`} ></i>
                </Link> 
              }
              
            </div>
            <div className="header-menu-item header-menu-right-item">
              <Link to ='/cart'>
                <i className={`bx ${splitLocation[1] === "cart" ? "bxs-shopping-bag" : "bx-shopping-bag"}`} ></i>
              </Link>
            </div>
            {/* <div className="header-menu-item header-menu-right-item">
              <i class='bx bx-menu-alt-right' ></i>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
