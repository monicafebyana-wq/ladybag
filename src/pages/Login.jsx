import React, { Component } from 'react'
import Helmet from '../components/Helmet'
import LoginForm from '../components/auth/Login'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

export default class Login extends Component {
  constructor(props){
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data){
    //Update parent component
    this.props.handleLogin(data);
    this.props.history.push("/user");
  }

  render(){
    return (
      <Helmet title="Login">
        <div className="logres">
          <div className="logres-content">
            <div className="logres-content-title">
              Login
            </div>
            <div className="logres-card">
                <Grid container spacing={2}>
                  <LoginForm 
                  handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                </Grid>
                <div className="logres-card-form-conditional">
                  <Link to='/user/register'> Don't have an account yet ? </Link>
                </div>
            </div>
          </div>
        </div>
      </Helmet>
    )
  }
}
