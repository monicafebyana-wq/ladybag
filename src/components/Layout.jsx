import React, { Component } from 'react'
import { BrowserRouter, Route, Link} from 'react-router-dom'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import notifUtils from '../assets/utils/notification.json'
import { store } from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

import Header from './Header'
import Footer from './Footer'
import Routes from '../routes/Routes'

export default class Layout extends Component {
  constructor(){
    super();

    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }

  handleLogout(){
    this.setState({
      loggedInStatus : "NOT_LOGGED_IN",
      user:{}
    });
  }

  handleLogin(data){
    this.setState({
      loggedInStatus : "LOGGED_IN",
      user:data
    });
  }

  render(){
    return (
      <BrowserRouter>
        <Route render={props => (
          <div>
            <Header 
            {...props} 
            user={this.state.user} />
            <div className="absolute-bottom">
              <Link to='/feedback'>
                <button className="bottom-right">
                  <i className='bx bxs-pencil'></i>
                </button>
              </Link>
            </div>
            <ReactNotification />
            <div className="container">
              <div className="main">
                <Routes 
                  {...props} 
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  data={this.state.user}
                  loggedInStatus={this.state.loggedInStatus}
                />
              </div>
            </div>
            <Footer />
          </div>
        )} />
      </BrowserRouter>
    )
  }
}