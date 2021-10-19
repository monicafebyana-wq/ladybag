import React, { Component }  from 'react'
import Helmet from '../components/Helmet'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/auth/Registration'

export default class Register extends Component {
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
      <Helmet title="Register">
        <div className="logres">
          <div className="logres-content">
            <div className="logres-content-title">
              Register
            </div>
            <div className="logres-card">
                <Grid container spacing={2}>
                  <RegisterForm 
                  handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                </Grid>
                <div className="logres-card-form-conditional">
                  <Link to='/user/login'> Already have an account ? </Link>
                </div>
            </div>
          </div>
        </div>
      </Helmet>
    )
  }
}