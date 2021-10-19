import React, { Component } from 'react'
import axios from 'axios';
import Helmet from '../components/Helmet'
import Grid from '@material-ui/core/Grid'
import { Redirect } from 'react-router-dom'

import UserNav from '../components/UserNav'
import UserForm from '../components/UserForm'

export default class User extends Component {
  constructor(props){
    super(props);
    this.state = { data: {} };

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(){
    axios
    .delete(`${process.env.REACT_APP_API_URL}logout`, { withCredentials: true })
    .then(response => {
      this.props.handleLogout();
      this.props.history.push("/user/login");
    }).catch(error => {
      console.log("logout error", error);
    })
  }

  render() {
    return (
      <Helmet title="User">
        <div className="user">
        {
          this.props.data === undefined ? 
          <Redirect to = 'user/register' />
            :
          <Grid container spacing={3}>
            <UserNav 
            handleLogout={this.handleLogoutClick}
          />
            <Grid item sm={12} md={10}>
                <UserForm 
                username={this.props.data.username}
                email={this.props.data.email}
                idUser={this.props.data.id}
                />
            </Grid>
          </Grid>
        }
        </div>
      </Helmet>
    )
  }
}