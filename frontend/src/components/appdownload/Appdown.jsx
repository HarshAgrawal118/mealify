import React from 'react'
import './Appdown.css'
import { assets } from '../../assets/assets'
export default function () {
  return (
    <div className='appdown' id='appdown'>
         <p>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.</p>
         <div className="appdown-platform">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
         </div>
    </div>
  )
}
