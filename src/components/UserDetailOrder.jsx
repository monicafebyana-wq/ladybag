import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

import OrderItem from './OrderItem'
import Title from './Title'
import { formatDate } from '../assets/utils/utils';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const UserDetailOrder = (props) => {
  const [lineItems, setLineItems] = useState(null);
  const [status, setStatus] = useState(null);
  const [district, setDistrict] = useState(null);

  const url =`${process.env.REACT_APP_API_URL}line_item_clones`
  const url2 =`${process.env.REACT_APP_API_URL}statuses`
  const url3 =`${process.env.REACT_APP_API_URL}districts`
  
  useEffect(() => {
    axios.get(url).then((response) => {
      setLineItems(response.data);
    });
    axios.get(url2).then((response) => {
      setStatus(response.data);
    });
    axios.get(url3).then((response) => {
      setDistrict(response.data);
    });
  }, []);

  if (!lineItems || !status || !district) return (
    <div className="loading">
      <BounceLoader color='#AD0303' loading={true} css={override} size={60} />
    </div>
  );

  return (
    <div>
      Order #{props.id_payment} was placed on {formatDate(props.created_at)}
      <h1>Order Details</h1>
      <div className="oSummary">
        <div className="oSummary-list">
        <Title
        title="Customer Details"
        />
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <div className="oSummary-list-item-bag">
                Name 
              </div>
            </Grid>
            <Grid item sm={6}>
              {props.fullname}
            </Grid>
            <Grid item sm={6}>
              <div className="oSummary-list-item-bag">
                Address 
              </div>
            </Grid>
            <Grid item sm={6}>
              {props.address}
            </Grid>
            <Grid item sm={6}>
              <div className="oSummary-list-item-bag">
                Phone 
              </div>
            </Grid>
            <Grid item sm={6}>
              {props.phone}
            </Grid>
            <Grid item sm={6}>
              <div className="oSummary-list-item-bag">
                Payment Method 
              </div>
            </Grid>
            <Grid item sm={6}>
              Cash On Delivery (COD)
            </Grid>
            <Grid item sm={6}>
              <div className="oSummary-list-item-bag">
                Status
              </div>
            </Grid>
            <Grid item sm={6}>
              {
                status.map((item, i) => (
                  props.status_id === item.id ?
                  item.status
                  :
                  ''
                ))
              }
            </Grid>
          </Grid>
        </div>
      <div className="hr"/>
      <div className="oSummary-body">
        <Title
          title="Your Order"
          />
        <div className="oSummary-list">
        {
            lineItems.map((item, i) => (
              item.cart_id === props.cart_id ?
              <OrderItem
              key={i}
              {...item} 
              /> 
              :
              ''
            ))
          }
        </div>
        <div className="hr"/>
        <div className="oSummary-subtotal">
          <Grid container spacing={5}>
            <Grid item sm={8}>
              <div className="oSummary-subtotal-text">
                Subtotal
              </div>
            </Grid>
            <Grid item sm={4}>
              <div className="price">
              Rp.
                {
                  props.subtotal.toLocaleString()
                }
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item sm={8}>
              <div className="oSummary-subtotal-text">
                Shipping
              </div>
            </Grid>
            {
              district.map((item, i) => (
                props.district_id === item.id ?
                  <Grid item sm={4}>
                    <div className="price">
                      {item.name} : Rp. {item.price.toLocaleString()}
                    </div>
                  </Grid>
                :
                ''
              ))
            }
          </Grid>
        </div>
          <div>
            <div className="hr" />
              <div className="oSummary-total">
                <Grid container spacing={5}>
                  <Grid item sm={8}>
                    <div className="oSummary-total-text">
                      Total
                    </div>
                  </Grid>
                  <Grid item sm={4}>
                    <div className="oSummary-total-price price">
                      Rp. {props.total.toLocaleString()}
                    </div>
                  </Grid>
                </Grid>
              </div>
          </div>
      </div>
      <div className="oSummary-note">
        <div className="oSummary-note-title">
          note :
        </div>
        <div className="oSummary-note-body">
        Please note that your billing details will be verified and your credit card will be charged at the time of shipment. For Made to Order, DIY, personalised and selected Décor items, payment will be taken at the time the order is placed.
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserDetailOrder
