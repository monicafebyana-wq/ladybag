import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";

import ProductsCard from '../components/ProductsCard';
import Helmet from '../components/Helmet'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

const Search = (props) => {
  const location = useLocation()
  const fromNav = location.state?.name

  const [prod, setProd] = useState(null);

  const url =`${process.env.REACT_APP_API_URL}products`

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
    <Helmet title="Search">
      <div className="search">
        <div className="search-title">
          Search : {fromNav}
        </div>
      </div>
      <Grid container spacing={3}>
        {
          prod.filter((item) => {
            if (fromNav === ""){
              return item
            }else if (item.name.toLowerCase().includes(fromNav.toLowerCase())){
              return item
            }
          }).map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <ProductsCard
                key={i}
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
    </Helmet>
  )
}

export default Search
