import React from 'react'

import logo from '../assets/images/LadyBag White.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-logo">
          <img src={logo} alt="" />
        </div>
        <div className="footer-quote">
          “Creativity and quality are at the very core of LadyBag.”
        </div><br /><br />
        <div className="footer-content">
          <div className="footer-content-contact">
          <p>Address : 04769 6F, 83-21, Wangsimni-ro, Seongdong-gu, Seoul, Republic of Korea</p><br />
          <p>Phone : 211-88-17109</p><br />
          <p>E-mail : cscenter_en@ladybag.com</p>
          </div>
        </div>
        <div className="footer-content-social-media">
          <div className="social-media">
            <i className='bx bxl-facebook-circle'></i>
            <i className='bx bxl-instagram' ></i>
            <i className='bx bxl-twitter' ></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
