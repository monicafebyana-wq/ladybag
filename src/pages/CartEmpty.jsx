import React from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'


const Cart = () => {
  return (
    <Helmet title='Cart'>
      <div className="cart">
        <div className="cart-body">
          <br /><br />
          <div className="cart-empty">
            <h1 className="cart-empty-title">You haven't buy anything yet!</h1>
            <Link to="/catalog" className="oSummary-submit">
              <input type="submit" value="Let's buy something else" />
            </Link>
          </div>
        </div>
      </div>
    </Helmet>
  )
}

export default Cart
