import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import notifUtils from '../assets/utils/notification.json'
import { store } from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

export default class FormFeedback extends Component {
  constructor(props){
    super(props);

    this.state = {
      name : "",
      email : "",
      title : "",
      review : ""
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
      name,
      email,
      title,
      review
    } = this.state;

    axios.post(`${process.env.REACT_APP_API_URL}feedbacks`, 
      {
        name: name,
        email: email,
        title: title,
        review: review
      },
      { withCredentials : true }
    ).then(response => {
      if (response.data.status === 'created'){
        store.addNotification(notifUtils[12]);
      }
    }).catch(error => {
      store.addNotification(notifUtils[10]);
    });
    event.preventDefault();
  }

  render(){
    return (
      <form className="feedback" onSubmit={this.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className="form-control-direction">
              <label htmlFor="fullName">Full Name <span aria-hidden="true" className="required">*</span></label>
              <input 
              type="text" 
              name="name" 
              id="name" 
              required 
              value={this.state.name} 
              onChange={this.handleChange} 
              placeholder="Full Name"/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-control-direction">
              <label htmlFor="email">Email <span aria-hidden="true" className="required">*</span></label>
              <input 
              type="text" 
              name="email" 
              id="email" 
              required
              value={this.state.email} 
              onChange={this.handleChange}  
              placeholder="Email"/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-control-direction">
              <label htmlFor="title">Title <span aria-hidden="true" className="required">*</span></label>
              <input 
              type="text" 
              name="title" 
              id="title" 
              required
              value={this.state.title} 
              onChange={this.handleChange}  
              placeholder="Title of Feedback"/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="form-control-direction">
              <label htmlFor="feedback">Feedback <span aria-hidden="true" className="required">*</span></label>
              <textarea 
              name="review" 
              id="review" 
              required 
              value={this.state.review} 
              onChange={this.handleChange} 
              placeholder="Your Feedback"/>
            </div>
          </Grid>
        </Grid>
        <div className="oSummary-submit">
          <input type="submit" value="Submit" />
        </div>
      </form>
    )
  }
}
