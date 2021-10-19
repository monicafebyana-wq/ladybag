import React from 'react'

const ProductText = props => {
  return (
    <div className="prodText">
      <div className="prodText-title">
        Product Details
      </div>
      <div className="prodText-body">
        {props.description}
      </div>
    </div>
  )
}

export default ProductText
