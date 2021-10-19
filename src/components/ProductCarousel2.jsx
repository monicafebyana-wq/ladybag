import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { Link } from 'react-router-dom'
import notifUtils from '../assets/utils/notification.json'
import { store } from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

const ProductCarousel = (props) => {
  const [img, setImg] = useState(0);
  const [loading, setLoading] = useState(false);

  function handleDropdownChange(e){
    setLoading(true)
    setImg(e.target.value);
    setLoading(false)
  }

  function onSubmit(e){
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}line_items`, 
    { 
      user_id : props.idUser,
      image_id : props.image[img].id,
      price_cents: props.price_cents,
      product_name: props.name
    },
    { withCredentials : true }).then(res => {
      store.addNotification(notifUtils[0]);
    }).catch(error => {
      store.addNotification(notifUtils[10]);
    });
  }

  function warning(){
    store.addNotification(notifUtils[1])
  }

  return (
    <div className="carouselBag">
      <div className="carouselBag-item">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <div className="carouselBag-left">
              <img src={props.model} alt="" />
            </div>
          </Grid>
          <div className="carouselBag-top">
            <Grid item xs={12} md={null}>
                <img src={props.image[img].uploadedFileUrl} alt="" />
            </Grid>
          </div>
          <Grid item xs={12} md={4}>
            <div className="carouselBag-middle">
              <div className="carouselBag-middle-category">
              </div>
              <h1 className="carouselBag-middle-title">
                {props.name}
              </h1>
              <div className="carouselBag-middle-colorSelect">
                <select name="color" id="color" className="colorSelect" onChange={handleDropdownChange}>
                {
                  props.image.map((item, i) => (
                    <option 
                    value={i}
                    key={i}>
                      {item.warna}
                    </option>
                  ))
                }
                </select>
              </div>
              <div className="hr"/>
              <div className="carouselBag-middle-price">
                Rp.{props.price_cents.toLocaleString()}
              </div>
              <div className="carouselBag-middle-button">
                {
                  props.idUser ? 
                  <form onSubmit={onSubmit}> 
                    <input type="hidden" name="idUser" id="idUser" value={props.idUser} />
                    <input type="hidden" name="image" id="image" value={props.image[img].id} />
                    <input type="submit" value="Add To Cart" className="bag-button"/>
                  </form>
                  :
                  <Link to='/user/login'>
                    <input type="submit" value="Add To Cart" onClick={warning} className="bag-button"/>
                  </Link>
                }
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="carouselBag-right">
              {
                loading ?
                <>
                Loading...
                </>
                :
                <img src={props.image[img].uploadedFileUrl} alt="" />
              }
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ProductCarousel