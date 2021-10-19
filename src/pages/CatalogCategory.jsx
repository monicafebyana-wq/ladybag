import React, { useState, useEffect } from 'react'
import axios from "axios"
import Helmet from '../components/Helmet'
import Carousel from '../components/Carousel'
import ProductsCard from '../components/ProductsCard'
import { Link, useLocation } from 'react-router-dom'
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import CatalogPage from '../components/CatalogPage';

import Grid from '@material-ui/core/Grid'

import slider from '../assets/images/carousel.jpg'

const url =`${process.env.REACT_APP_API_URL}products`
const url2 =`${process.env.REACT_APP_API_URL}categories`

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

const CatalogCategory = (props) => {

  const location = useLocation()
  const fromCatalog = location.state?.category_id

  const [prod, setProd] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      setProd(response.data);
    });
    axios.get(url2).then((response) => {
      setCategory(response.data);
    });
  }, []);

  if (!prod || !category ) return (
    <div className="loading">
      <BounceLoader color='#AD0303' loading={true} css={override} size={60} />
    </div>
  )

  return (
    <Helmet title='Catalog'>
      <Carousel 
      img={slider}
      button="Catalog"
      />
      <Grid container spacing={3}>
        <Grid item sm={12} md={2}>
        <div className="navleft">
          <Link to='/catalog'>
          <div className="navleft-title">Products</div>
          </Link>
          <hr />
          <div className="navleft-item">
          {
              category.map((item, index) => (
                <div key={index} className="navleft-item-category">
                  <Link to={{
                    pathname : `/catalog/${item.slug}`,
                    state : {category_id:item.id}
                    }}>
                    {item.name}
                    <div className="hover-active" />
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
        </Grid>
        <Grid item sm={12} md={10}>
          <Grid container spacing={3}>
            {
              prod.map((item, index) => (
                item.category_id === fromCatalog ? 
                  <Grid key={index} item xs={12} sm={4}>
                      <ProductsCard
                      key={index}
                      {...item}
                      idUser={
                        props.data===undefined?
                        '' 
                        : 
                        props.data.id
                      }/>
                  </Grid>
                : 
                ''
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    </Helmet>
  )
}

export default CatalogCategory