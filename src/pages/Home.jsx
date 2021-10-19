import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import axios from "axios"
import Helmet from '../components/Helmet'
import ProductsCard from '../components/ProductsCard'
import Carousel from '../components/Carousel'
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

import slider from '../assets/images/slider.png';
import bagAu from '../assets/images/bag-au.png';
import modelAu from '../assets/images/model-au.png';

const url =`${process.env.REACT_APP_API_URL}products`

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Home = (props) => {
  const [prod, setProd] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      setProd(response.data);
    });
  }, []);

  if (!prod) return (
    <div className="loading">
      <BounceLoader color='#AD0303' loading={true} css={override} size={60} />
    </div>
  );

  return (
    <Helmet title='Home'>
      <div className="home">
        <Carousel 
        img={slider}
        title="What's New"
        caption="A lineup of ready-to-wear and accessories from the latest collection."
        button="BUY" 
        slug="/catalog"/>
        
        <div className="home-about-us">
          <div className="home-about-us-title">
            About Us
          </div>
          <div className="home-about-us-content">
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <div className="home-about-us-left">
                  <div className="home-about-us-left-title">
                    “Creativity and quality are at the very core of LadyBag.”
                  </div>
                  <p className="text">
                  LadyBag is an Indonesian-based and internationally known brand specialising in luxury leather goods, founded in 2021 by Monica, Nabilah, and Nisrina. <br /> <br /> Defined by elegant and understated lines and exceptional attention to detail, the LadyBag aesthetic is minimalist and contemporary, complemented by the signature bar closure which makes each LadyBag handbag instantly recognisable.
                  </p>
                  <center>
                    <Link to='/catalog'>
                      <button className="button">
                        Shop Now
                      </button>
                    </Link>
                  </center>
                </div>
              </Grid>
              <Grid item xs={12} md={7}>
                <div className="home-about-us-right">
                  <img src={bagAu} alt="" className="top" />
                  <img src={modelAu} alt="" className="bottom" />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="home-latest-product">
          <div className="home-latest-product-title">
            Latest Product
          </div>
          <div className="home-latest-product-content">
            <Grid container spacing={1}>
            {
              prod.slice(0, 3).map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <ProductsCard
                  key={index}
                  {...item}
                  idUser={
                    props.data===undefined?
                    '' 
                    : 
                    props.data.id
                  }
                  />
                </Grid>
              ))
            }
            </Grid>
          </div>
        </div>
      </div>
    </Helmet>
  )
}

export default Home
