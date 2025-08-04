import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'
export default function Footer() {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content">
        <div className='footer-content-left'>
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae iure veritatis quaerat porro ducimus earum laudantium deleniti quia distinctio consectetur id nulla provident, delectus autem facilis? Quasi explicabo expedita magnam.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className='footer-content-center'>
            <h2>COMPANY</h2>
            <ul>
                <li>home</li>
                <li>about us</li>
                <li>delivery</li>
                <li>privacy policy</li>
            </ul>
        </div>
        <div className='footer-content-right'>
            <h2>Keep In Touch</h2>
            <ul>
                <li>9874563258</li>
                <li>aghijskbjg</li>
            </ul>
        </div>
       </div>
       <hr />
       <p className="footer-copyright">Lorem ipsum dolor, adipisicing elit.</p>
    </div>
  )
}
