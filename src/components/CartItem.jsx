import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import notifUtils from '../assets/utils/notification.json'
import { store } from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

export default class CartItemm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      quantity: props.quantity
    };

    this.onTodoChange = this.onTodoChange.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onEditCart = this.onEditCart.bind(this, this.props.id);
  }

  onTodoChange(value){
    this.setState({
      quantity: value
    });
  }

  onDeleteHandler = (e) => {
    const idLine = this.idInput.value
    this.props.onDelete(idLine, e);
  }

  onEditCart = (id, e) =>{
    e.preventDefault();
    const idLine = this.idInput.value;
    axios.patch(`${process.env.REACT_APP_API_URL}line_items/${idLine}`, 
    { 
      quantity: this.state.quantity 
    },
    { withCredentials : true })
    .then(res => {
      store.addNotification(notifUtils[8])
      this.props.dataUpdate();
    }).catch(error => {
      store.addNotification(notifUtils[10])
      console.log(error)
    });
  }

  render() {
    let total = this.props.price_cents * this.state.quantity;
    return (
      <div className="cItem">
      <div className="hr" />
      <Grid container spacing={4}>
        <div className="cItem-close top">
          <Grid item xs={12}>
            <div className="cItem-close" onClick={this.onDeleteHandler}>
              <input type="hidden" 
              name="id_prod" 
              id="id_prod" 
              value={this.props.id}
              ref={(input) => { this.idInput = input }}/>
              <i className='bx bx-x'></i>
            </div>
          </Grid>
        </div>
        <Grid item xs={12} md={4}>
          <img src={this.props.image.uploadedFileUrl} className="cItem-img" alt="" />
        </Grid>
        <Grid item xs={12} md={5}>
          <div className="cItem-detail">
            <div className="cItem-detail-title">{this.props.product_name}</div>
            <div className="cItem-detail-color">Style : {this.props.image.warna}</div>
            <div className="cItem-detail-price">Rp. {this.props.price_cents.toLocaleString()}</div>
            <div className="cItem-detail-quantity">
              Quantity : 
              <form onSubmit={this.onEditCart}>
                <input type="number" 
                defaultValue={this.state.quantity} 
                min="1" 
                max="10" 
                name="quantity" 
                id="quantity" 
                onChange={e => this.onTodoChange(e.target.value)}
                />
                <input type="submit" value="Edit" />
              </form>
            </div>
            <div className="cItem-detail-total">Rp. {total.toLocaleString()}</div>
          </div>
        </Grid>
        <div className="cItem-close right">
          <Grid item xs={2} md={3}>
            <div className="cItem-close" onClick={this.onDeleteHandler}>
              <input type="hidden" 
              name="id_prod" 
              id="id_prod" 
              value={this.props.id}
              ref={(input) => { this.idInput = input }}/>
              <i className='bx bx-x'></i>
            </div>
          </Grid>
        </div>
      </Grid>
    </div>
    )
  }
}
