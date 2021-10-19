import React from 'react'
import Helmet from '../components/Helmet'

const NotFound = () => {
  return (
    <Helmet title="404 Not Found">
      <div className="notFound">
        <div className="notFound-item">
          <h1>Sorry.</h1>
          The page you requested could not be found.
          <p className="notFound-instruct">
          <div className="title">
            Why <i className='bx bx-help-circle'></i>
          </div>
          The address on the page was entered incorrectly, or <br />
          The page could not be found because the address of the requested page has been changed or deleted.<br />
          Please double-check that the address you entered is correct.
          </p>
        </div>
      </div>
    </Helmet>
  )
}

export default NotFound