import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'
import axios from 'axios';
import notifUtils from '../../assets/utils/notification.json'
import { store } from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

export default class Registration extends Component {
  constructor(props){
    super(props);

    this.state = {
      username : "",
      email : "",
      password : "",
      password_confirmation : "",
      registrationErrors : ""
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
      username,
      email,
      password,
      password_confirmation
    } = this.state;

    axios.post(`${process.env.REACT_APP_API_URL}registrations`, 
      {
        user: {
          username: username,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }
      },
      { withCredentials : true }
    ).then(response => {
      if (response.data.status === 'created'){
        this.props.handleSuccessfulAuth(response.data);
        store.addNotification(notifUtils[4]);
      }
    }).catch(error => {
      store.addNotification(notifUtils[10]);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="logres-card-form">
        <form onSubmit={this.handleSubmit}>
          <Grid item xs={12}>
            <label htmlFor="fullName">Full Name</label><br />
            <input type="text" 
            name="username" 
            value={this.state.username} 
            onChange={this.handleChange} 
            required 
            className="logres-card-form-item" 
            placeholder="Full Name"
            id="username" />
          </Grid>
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
          <Grid item xs={12}>
            <label htmlFor="password">Password Confirmation</label><br />
            <input type="password" 
            name="password_confirmation" 
            id="password_confirmation" 
            value={this.state.password_confirmation} 
            onChange={this.handleChange} 
            required 
            className="logres-card-form-item" 
            placeholder="Password Confirm"/>
          </Grid>
          <button type="submit" className="logres-card-form-submit">Register</button>
        </form>
      </div>
    )
  }
}
