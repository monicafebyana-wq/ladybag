import React, { useState, useEffect } from 'react'
import axios from "axios"
import Grid from '@material-ui/core/Grid'
import Title from './Title'
import OrderItem from './OrderItem'
import { Link } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const OrderSummary = props => {
  const [ongkir, setOngkir] = useState(null);

  const url =`${process.env.REACT_APP_API_URL}districts`
  
  useEffect(() => {
    axios.get(url).then((response) => {
      setOngkir(response.data);
    }, 
    { withCredentials : true });
  }, []);

  if (!ongkir) return (
    <div>
      <BounceLoader color='#AD0303' loading={true} css={override} size={60} />
    </div>
  );
  
  const sumPrice = props.line_items.map(item => item.price_cents * item.quantity).reduce((acc, item) => item + acc, 0);

  function onSubmit(e){
    e.preventDefault();
    const subTotal = sumPrice;
    props.onSubmit(e, subTotal);
  }

  return (
    <div className="oSummary">
      <Title
      title="order summary"
      />
      <div className="oSummary-id">UCART_LADYBAG_{props.created_at}</div>
      <div className="hr"/>
      <div className="oSummary-body">
        <div className="oSummary-list">
          {
            props.line_items.map((item, i) => (
              <OrderItem
              key={i}
              {...item} 
              /> 
            ))
          }
        </div>
        <div className="hr"/>
        <div className="oSummary-subtotal">
          <Grid container spacing={5}>
            <Grid item sm={8} xs={7}>
              <div className="oSummary-subtotal-text">
                Subtotal
              </div>
            </Grid>
            <Grid item sm={4} xs={5}>
              <div className="price">
              Rp.
                {
                  sumPrice.toLocaleString()
                }
              </div>
            </Grid>
          </Grid>
        </div>
        {
          props.title === "Payment" ? 
          <div>
            <div className="hr" />
            <form onSubmit={onSubmit}>
              <div className="oSummary-total">
                <Grid container spacing={5}>
                  <Grid item sm={6} xs={5}>
                    <div className="oSummary-total-shipping">
                      Shipping
                    </div>
                  </Grid>
                  <Grid item sm={6} xs={7}>
                    <div className="price">
                      <select name="shipping" className="oSummary-select" id="shipping">
                        {
                          ongkir.map((item, i) => (
                            <option 
                            defaultValue={item.price} 
                            key={i}
                            selected= {item.id == props.districts_id ? true : false}
                            disabled>
                              {item.name} : Rp {item.price.toLocaleString()}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item sm={7} xs={6}>
                    <div className="oSummary-total-text">
                      Total
                    </div>
                  </Grid>
                  <Grid item sm={5} xs={6}>
                    <div className="oSummary-total-price price">
                      {
                        ongkir.map((item, i) => (
                          item.id == props.districts_id ?
                            <div key={i}>Rp. {(sumPrice + item.price).toLocaleString()} </div>
                            :
                            ''
                        ))
                      }
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="oSummary-submit">
                <input type="submit" value="place order" />
              </div>
            </form>
          </div>
          :
          <Link to='/payment' className="oSummary-submit">
            <input type="submit" value="place order" />
          </Link>
        }
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
  )
}

export default OrderSummary
