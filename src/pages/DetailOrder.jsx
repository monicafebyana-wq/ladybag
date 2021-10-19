import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Helmet from '../components/Helmet'
import Grid from '@material-ui/core/Grid'
import { Redirect, useLocation, useParams } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

import UserNav from '../components/UserNav'
import UserDetailOrder from '../components/UserDetailOrder';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const DetailOrder = (props) => {
  const { id } = useParams();

  const [detail, setDetail] = useState(null);

  const url =`${process.env.REACT_APP_API_URL}payments/${id}`
  
  useEffect(() => {
    axios.get(url).then((response) => {
      setDetail(response.data);
    });
  }, []);

  if (!detail) return (
    <div className="loading">
      <BounceLoader color='#AD0303' loading={true} css={override} size={60} />
    </div>
  );


  function handleLogoutClick(){
    axios
    .delete(`${process.env.REACT_APP_API_URL}logout`, { withCredentials: true })
    .then(response => {
      props.handleLogout();
      props.history.push("/user/login");
    }).catch(error => {
      console.log("logout error", error);
    })
  }

  return (
    <Helmet title="User">
      <div className="user">
        <Grid container spacing={3}>
          <UserNav 
          handleLogout={handleLogoutClick}
        />
          <Grid item sm={12} md={10}>
              <UserDetailOrder
              id_payment={id}
              {...detail}/>
          </Grid>
        </Grid>
      </div>
    </Helmet>
  )
}

export default DetailOrder