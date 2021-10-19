import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { Link } from 'react-router-dom'
import notifUtils from '../assets/utils/notification.json'
import { store } from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

export default class ProductsCard extends Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}line_items`, 
    { 
      user_id : this.userIdInput.value,
      image_id : this.imageIdInput.value,
      price_cents : this.priceInput.value,
      product_name : this.productNameInput.value
    },
    { withCredentials : true }
    ).then(res => {
      store.addNotification(notifUtils[0])
    }).catch(error => {
      store.addNotification(notifUtils[10])
    });
  }

  warning = () => {
    store.addNotification(notifUtils[1])
  }

  render(){
    return (
      <div className="product-card">
        <div className="product-card-image">
          <img src={this.props.image[0].uploadedFileUrl} alt="" />
        </div>
          <div className="product-card-content">
            <Grid container spacing={3}>
            <Link to=
          {{ pathname: `/product/${this.props.slug}`, 
          state: {
            id:this.props.id, 
            idUser:this.props.idUser} }}>
              <Grid item xs={8}>
                <div className="category">{this.props.category}</div>
                <h1 className="name">{this.props.name}</h1>
                <div className="price">
                  Rp. {this.props.price_cents.toLocaleString()}
                </div>
              </Grid>
            </Link>
              <Grid item xs={4} onClick={this.onClick}>
                {
                  this.props.idUser?
                  <form onSubmit={this.handleSubmit}>
                    <input type="hidden" 
                    name="user_id" 
                    defaultValue={this.props.idUser}
                    ref={(input) => { this.userIdInput = input }} />
                    <input type="hidden" 
                    name="image_id" 
                    defaultValue={this.props.image[0].id}
                    ref={(input) => { this.imageIdInput = input }} />
                    <input type="hidden" 
                    name="price_cents" 
                    defaultValue={this.props.price_cents} 
                    ref={(input) => { this.priceInput = input }}/>
                    <input type="hidden" 
                    name="product_name" 
                    defaultValue={this.props.name}
                    ref={(input) => { this.productNameInput = input }} />
                    <button className="cart" type="submit"><i className='bx bx-cart-alt' ></i></button>
                  </form>
                  :
                  <Link to='/user/login'>
                    <button className="cart" type="submit" onClick={this.warning}><i className='bx bx-cart-alt' ></i></button>
                  </Link>
                }
              </Grid>
            </Grid>
          </div>
      </div>
    )
  }
}

