import React, { Component } from 'react'
import Helmet from '../components/Helmet'
import Carousel from '../components/Carousel'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";
import CatalogPage from '../components/CatalogPage';

import slider from '../assets/images/carousel.jpg'

export default class Catalog extends Component{
  constructor(props){
    super(props);
    this.state = { 
      category: [],
      isLoading: true
    };

  }

  componentDidMount() {
    this.setState({isLoading:true})
    fetch(`${process.env.REACT_APP_API_URL}categories`)
      .then(res => res.json())
      .then(data => this.setState({ 
        category: data,
        isLoading : false }));
  }
  

  render(){
    const { category } = this.state
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
    return (
      <Helmet title='Catalog'>
        {
          this.state.isLoading ?
          <div className="loading">
            <BounceLoader color='#AD0303' loading={this.state.isLoading} css={override} size={60} />
          </div>
          :
          <>
            <Carousel 
          img={slider}
          button="Catalog"
          />
          <Grid container spacing={3}>
            <Grid item sm={12} md={2}>
            <div className="navleft">
              <Link to='/catalog'>
              <div className="navleft-title">Products</div>
              </Link>
              <hr />
              <div className="navleft-item">
                {
                  category.map((item, index) => (
                    <div key={index} className="navleft-item-category">
                      <Link to={{
                        pathname : `/catalog/${item.slug}`,
                        state : {category_id:item.id}
                        }}>
                        {item.name}
                        <div className="hover-active" />
                      </Link>
                    </div>
                  ))
                }
              </div>
            </div>
            </Grid>
            <Grid item sm={12} md={10}>
              <CatalogPage 
              idUser={
                this.props.data===undefined?
                '' 
                : 
                this.props.data.id
              }/>
              </Grid>
            </Grid>
          </>
        }
      </Helmet>
    )
  }
}
