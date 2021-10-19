import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Carousel = props => {
  return (
    <div className="carousel">
      <div className="carousell">
        <img src={props.img} alt="" />
        <div className="carousel-text">
          <h1 className="carousel-text-title">
            {props.title}
          </h1>
          <div className="carousel-text-caption">
            {props.caption}
          </div>
          {
            props.button === "Catalog" ?
            <div/>
            :
            <Link to={props.slug}>
              <div className="carousel-button">
                {props.button}
              </div>
            </Link>
          }
        </div>
      </div>
    </div>
  )
}

Carousel.propTypes = {
  title:PropTypes.string,
  caption:PropTypes.string,
  button:PropTypes.string,
  img:PropTypes.string.isRequired,
  slug:PropTypes.string
}

export default Carousel
