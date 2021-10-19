import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import notifUtils from '../assets/utils/notification.json'
import { store } from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

const link = [
  {
    name : 'Account',
    icon : <i className='bx bx-user' />,
    path : '/user'
  },
  {
    name: 'Orders',
    icon: <i className='bx bx-cart-alt' />,
    path: '/user/order'
  }
]

export default class UserNav extends Component {
  constructor(props){
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick(){
    this.props.handleLogout();
    store.addNotification(notifUtils[6]);
  }

  render() {
    return (
      <Grid item sm={12} md={2}>
        <div className="navleft">
          <div className="navleft-title">User</div>
          <hr />
          <div className="navleft-item">
            {
              link.map((item, i) => (
                <div key={i} className="navleft-item-category">
                  <Link to={item.path}>
                    {item.icon} {item.name}
                    <div className="hover-active" />
                  </Link>
                </div>
              ))
            }
            <div className="navleft-item-category">
              <button onClick={() => this.handleLogoutClick()} className="logout">
                <i className='bx bx-log-out' /> Logout
                <div className="hover-active" />
              </button>
            </div>
          </div>
        </div>
      </Grid>
    )
  }
}
