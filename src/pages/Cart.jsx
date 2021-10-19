import React, { useState, useEffect } from 'react'
import axios from "axios"
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";
import Grid from '@material-ui/core/Grid'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import notifUtils from '../assets/utils/notification.json'
import { store } from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

import Helmet from '../components/Helmet'
import OrderSummary from '../components/OrderSummary'
import CartItem from '../components/CartItem'
import Title from '../components/Title'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Cart = (props) => {
  const [cart, setCart] = useState(null);

  const url =`${process.env.REACT_APP_API_URL}carts/${props.id}`
  
  function data(){
    axios.get(url).then((response) => {
      setCart(response.data);
    });
  }

  useEffect(() => {
    data();
  }, []);

  function onDeleteHandler(id, e){
    e.stopPropagation();
    confirmAlert({
      title: 'Are You Sure?',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.delete(`${process.env.REACT_APP_API_URL}line_items/${id}`)
            .then((response) => {
              data();
              store.addNotification(notifUtils[9])
            })
          }
        },
        {
          label: 'No'
        }
      ]
    });

  }

  if (!cart) return (
    <div className="loading">
      <BounceLoader color='#AD0303' loading={true} css={override} size={60} />
    </div>
  );

  return (
    <Helmet title='Cart'>
      <div className="cart">
        <div className="cart-body">
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <div className="cart-selection">
                <Title
                title="your selection"
                />
                {
                  cart.line_items.map((item, i) => (
                    <CartItem 
                      key={i}
                      {...item}
                      onDelete={onDeleteHandler}
                      dataUpdate={data}
                    />
                  ))
                }
              </div>
            </Grid>
            <Grid item xs={12} md={5}>
              <OrderSummary 
                title="Cart"
                {...cart}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Helmet>
  )
}

export default Cart
