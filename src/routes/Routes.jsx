import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Payment from '../pages/Payment';
import CatalogCategory from '../pages/CatalogCategory';
import User from '../pages/User';
import UserOrder from '../pages/UserOrder';
import Search from '../pages/Search';
import DetailProduct from '../pages/DetailProduct';
import DetailOrder from '../pages/DetailOrder';
import CartEmpty from '../pages/CartEmpty';
import FeedBack from '../pages/FeedBack';

export default class Routes extends Component {
  constructor(props){
    super(props);

    this.state = {
      items: [],
      products: [],
      payments: [],
      category: []
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    this.props.handleLogout();
  }

  handleLogin(data){
    this.props.handleLogin(data);
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}carts`,
    { withCredentials : true })
      .then(res => res.json())
      .then(data => this.setState({ items: data }));
    fetch(`${process.env.REACT_APP_API_URL}products`,
    { withCredentials : true })
      .then(res => res.json())
      .then(data => this.setState({ products: data }));
    fetch(`${process.env.REACT_APP_API_URL}payments`,
    { withCredentials : true })
      .then(res => res.json())
      .then(data => this.setState({ payments: data }));
      fetch(`${process.env.REACT_APP_API_URL}categories`,
      { withCredentials : true })
        .then(res => res.json())
        .then(data => this.setState({ category: data }));
  }

  render(){
    const { items, category, products, payments } = this.state
    return (
      <Switch>
        <Route 
        path='/' 
        exact 
        render={props => (
          <Home {...props}
          data={this.props.data.user} />)}/>
        
        <Route 
        path='/catalog' 
        exact 
        render={props => (
          <Catalog {...props}
          data={this.props.data.user} />)}
          />
        
        {
          category.map((item, i) => (
            <Route key={i} 
            path={`/catalog/${item.slug}`} 
            exact 
            render={props =>(
              <CatalogCategory {...props}
              data={this.props.data.user} />
            )} />
          ))
        }

        {
          products.map((item, i) => (
            <Route key={i} path={`/product/${item.slug}`} exact component={DetailProduct} />
          ))
        }

        <Route
        path='/cart'
        exact
        render={props => (
          this.props.data.user === undefined ?
          <Redirect to='/user/register'/>
          :
          items.length < 1 ?
            <CartEmpty {...props}/>
            :
            items.map((item, i) => (
              item.user_id === this.props.data.user.id ? 
              <Cart {...props}
              id={item.id}
              key={i}/> 
              : 
              ''
            ))
        )}
        />

        <Route
        path='/payment'
        exact
        render={props => (
          this.props.data.user === undefined ?
          <Redirect to='/user/register'/>
          :
          items.map((item, i) => (
            item.user_id === this.props.data.user.id ? 
            <Payment {...props}
            id={item.id}
            username={this.props.data.user.username}
            userId={this.props.data.user.id}
            key={i}/> 
            : 
            ''
          ))
        )}
        />

        <Route path='/search' exact component={Search} />

        <Route 
        path='/user' 
        exact 
        render={props => (
          <User {...props} 
          handleLogout={this.handleLogout}
          loggedInStatus={this.props.loggedInStatus}
          data={this.props.data.user} />)} />

        <Route 
        path='/user/order' 
        exact 
        render={props => (
          <UserOrder {...props} 
          handleLogout={this.handleLogout}
          loggedInStatus={this.props.loggedInStatus}
          data={this.props.data.user} />)} /> 
          
        
        {
          payments.map((item, i) => (
            <Route 
            key={i} 
            path={`/user/order/:id`} 
            exact 
            render={props => (
              <DetailOrder {...props}
              handleLogout={this.handleLogout}
              />)} />
          ))
        }
        
        <Route 
        path='/user/login' 
        exact 
        render={props => (
          <Login {...props} 
          handleLogin={this.handleLogin}
          loggedInStatus={this.props.loggedInStatus} />)}
        />
        
        <Route 
        path='/user/register' 
        exact
        render={props => (
          <Register {...props} 
          handleLogin={this.handleLogin}
          loggedInStatus={this.props.loggedInStatus} />)}  
        />

        <Route path='/feedback' exact component={FeedBack}/>

        {/* <Route component={NotFound} /> */}
      </Switch>
    )
  }
}
