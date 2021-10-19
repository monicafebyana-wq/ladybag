import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from "axios"

const OrderItem = props => {
  let total = props.price_cents * props.quantity;

  return (
    <div className="oSummary-list-item">
      <Grid container spacing={5}>
        <Grid item sm={8}>
          <div className="oSummary-list-item-bag">
            {props.product_name}, {props.image.warna} x{props.quantity}
          </div>
        </Grid>
        <Grid item sm={4}>
          <div className="price">
            Rp. {total.toLocaleString()}
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default OrderItem
