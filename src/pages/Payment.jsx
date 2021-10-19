import React, { useState, useEffect } from 'react'
import axios from "axios"
import Grid from '@material-ui/core/Grid'
import { store } from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

import OrderSummary from '../components/OrderSummary'
import Title from '../components/Title'
import notifUtils from '../assets/utils/notification.json'
import Helmet from '../components/Helmet'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Payment = (props) => {
  const [cart, setCart] = useState(null);
  const [ongkir, setOngkir] = useState(null);
  const [ongkirKey, setOngkirKey] = useState(0);
  const [ongkirPrice, setOngkirPrice] = useState(0);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [districts, setDistricts] = useState(1);
  const country = "Indonesia";
  const city = "Cimahi";

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}carts/${props.id}`).then((response) => {
      setCart(response.data);
    });
    axios.get(`${process.env.REACT_APP_API_URL}districts`).then((response) => {
      setOngkir(response.data);
    });
    axios.get(`${process.env.REACT_APP_API_URL}users/${props.userId}`).then((response) => {
      setAddress(response.data.address);
      setPhone(response.data.phone);
    });
  }, []);

  if (!cart || !ongkir) return (
    <div className="loading">
      <BounceLoader color='#AD0303' loading={true} css={override} size={60} />
    </div>
  );

  function onAddress(e){
    setAddress(e.target.value)
  }

  function onPhone(e){
    setPhone(e.target.value)
  }

  function handleDropdownChange(e){
    setDistricts(e.target.value);
  }

  function onClickOngkir(e){
    e.preventDefault();
    setOngkirKey(districts-1);
  }
  
  function onHoverOngkir(e){
    e.preventDefault();
    setOngkirPrice(ongkir[ongkirKey].price);
  }

  function onSubmit(e, subTotal){
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}payments`, 
    { 
      user_id:props.userId,
      fullname:props.username,
      country:country,
      city:city,
      district_id:districts,
      address:address,
      phone:phone,
      cart_id:cart.id,
      subtotal:subTotal,
      total:subTotal + ongkirPrice,
      status_id:1
    },
    { withCredentials : true })
    .then(res => {
      store.addNotification(notifUtils[7])
      
      cart.line_items.map((item, i) =>
        axios.post(`${process.env.REACT_APP_API_URL}line_item_clones`, 
        { 
          cart_id:cart.id,
          quantity:item.quantity,
          image_id:item.image_id,
          price_cents:item.price_cents,
          product_name : item.product_name
        },
        { withCredentials : true }).then(res => {
        }).catch(error => {
          console.log("clone error", error);
        })
      )
      
      axios.delete(`${process.env.REACT_APP_API_URL}carts/${props.id}`)
      
      props.history.push("/catalog");
    }).catch(error => {
      store.addNotification(notifUtils[10])
    });
    
  }

  return (
    <Helmet title='Payment'>
      <div className="payment">
        <div className="payment-body">
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <div className="payment-form">
                <Title title="billing details"/>
                <div className="hr" />
                <form action="" className="form-control">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <div className="form-control-direction">
                        <label htmlFor="fullName">Full Name <span aria-hidden="true" className="required">*</span></label>
                        <input type="text" 
                        name="firstName" 
                        value={props.username} 
                        id="firstName" 
                        required 
                        disabled
                        placeholder="Full Name"/>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div className="form-control-direction">
                        <label htmlFor="country">Country <span aria-hidden="true" className="required">*</span></label>
                        <input 
                        type="text" 
                        name="country" 
                        id="country" 
                        value={country}
                        disabled 
                        placeholder="Country"/>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div className="form-control-direction">
                        <label htmlFor="townCity">Town / City <span aria-hidden="true" className="required">*</span></label>
                        <input 
                        type="text" 
                        name="townCity" 
                        id="townCity" 
                        disabled 
                        value={city}
                        placeholder="Town / City"/>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div className="form-control-direction">
                        <label htmlFor="districts">Districts <span aria-hidden="true" className="required">*</span></label>
                        <select name="districts" id="districts" onChange={handleDropdownChange} onClick={onClickOngkir}>
                          {
                            ongkir.map((item, i) => (
                              <option value={item.id} key={i}>{item.name}</option>
                            ))
                          }
                        </select>
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
                        placeholder={address ? address : "Address"}
                        onChange={onAddress}
                        />
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
                        placeholder={phone ? phone : "+62xxxxxxxx"}
                        onChange={onPhone}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              <div onMouseEnter={onHoverOngkir}>
                <OrderSummary 
                  title="Payment"
                  {...cart}
                  districts_id={districts}
                  onSubmit={onSubmit}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Helmet>
  )
}

export default Payment
