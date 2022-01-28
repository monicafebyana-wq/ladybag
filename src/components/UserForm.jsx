import React, { useState, useEffect } from 'react'
import axios from "axios"
import Grid from '@material-ui/core/Grid'
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import notifUtils from '../assets/utils/notification.json'
import { store } from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const UserForm = (props) => {
  const [data, setData] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [username, setUsername] = useState(null);

  const url = `${process.env.REACT_APP_API_URL}users/${props.idUser}`

  function dataUser(){
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }
  useEffect(() => {
    dataUser();
  }, []);
  
  function onUsername(e){
     setUsername(e.target.value)
  }
  
  function onAddress(e){
    setAddress(e.target.value)
  }

  function onPhone(e){
    setPhone(e.target.value)
  }

  function onSubmit(e){
    e.preventDefault();
    axios.patch(`${process.env.REACT_APP_API_URL}users/${props.idUser}`, 
    { 
      address: address,
      phone: phone,
      username: username
    },
    { withCredentials : true })
    .then(res => {
      dataUser();
      store.addNotification(notifUtils[11]);
    }).catch(error => {
      store.addNotification(notifUtils[10])
    });
  }

  if (!data) return (
    <div className="loading">
      <BounceLoader color='#AD0303' loading={true} css={override} size={60} />
    </div>
  );

  return (
      <div className="userForm">
        <form className="form-control" onSubmit={onSubmit}> 
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className="form-control-direction">
              <label htmlFor="fullName">Full Name <span aria-hidden="true" className="required">*</span></label>
              <input type="text" name="fullName" placeholder={data.username ? data.username : "Full Name"} id="fullName" onChange={onUsername} required/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-control-direction">
              <label htmlFor="email">Email <span aria-hidden="true" className="required">*</span></label>
              <input type="text" name="email" id="email" disabled value={props.email} required placeholder="Email"/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-control-direction">
              <label htmlFor="country">Country <span aria-hidden="true" className="required">*</span></label>
              <input type="text" name="country" id="country" disabled value="Indonesia" required placeholder="Country"/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-control-direction">
              <label htmlFor="townCity">Town / City <span aria-hidden="true" className="required">*</span></label>
              <input type="text" name="townCity" id="townCity" required disabled value="Cimahi" placeholder="Town / City"/>
            </div>
          </Grid>
            <Grid item xs={12}>
              <div className="form-control-direction">
                <label htmlFor="address">Address <span aria-hidden="true" className="required">*</span></label>
                <input 
                type="text" 
                name="address" 
                id="address" 
                required 
                onChange={onAddress}
                placeholder={data.address ? data.address : "Address"} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="form-control-direction">
                <label htmlFor="phone">Phone <span aria-hidden="true" className="required">*</span></label>
                <input 
                type="text" 
                name="phone" 
                id="phone" 
                required 
                onChange={onPhone}
                placeholder={data.phone ? data.phone : "+62xxxxxx"} />
              </div>
            </Grid>
            <div className="oSummary-submit">
              <input type="submit" value="Submit" />
            </div>
        </Grid>
        </form>
      </div>
    )
}

export default UserForm
