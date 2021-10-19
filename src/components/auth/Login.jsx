import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'
import axios from 'axios';
import notifUtils from '../../assets/utils/notification.json'
import { store } from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email : "",
      password : "",
      loginErrors : ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSubmit(event){
    const {
      email,
      password
    } = this.state;

    axios.post(`${process.env.REACT_APP_API_URL}sessions`, 
      {
        user: {
          email: email,
          password: password
        }
      },
      { withCredentials : true }
    ).then(response => {
      if (response.data.logged_in){
        this.props.handleSuccessfulAuth(response.data);
        store.addNotification(notifUtils[2]);
      }else{
        store.addNotification(notifUtils[3]);
      }
    }).catch(error => {
      store.addNotification(notifUtils[10])
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="logres-card-form">
        <form onSubmit={this.handleSubmit}>
          <Grid item xs={12}>
            <label htmlFor="email">Email</label><br />
            <input type="email" 
            name="email" 
            id="email" 
            value={this.state.email} 
            onChange={this.handleChange} 
            required 
            className="logres-card-form-item" 
            placeholder="dumbledore@hogwarts.com" />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="password">Password</label><br />
            <input type="password" 
            name="password" 
            id="password" 
            value={this.state.password} 
            onChange={this.handleChange} 
            required 
            className="logres-card-form-item" 
            placeholder="Password"/>
          </Grid>
          <button type="submit" className="logres-card-form-submit">Login</button>
        </form>
      </div>
    )
  }
}
