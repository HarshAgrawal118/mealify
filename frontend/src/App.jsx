import React, { useState } from 'react'
import NavBar from './components/navBar/NavBar'
import { Route, Routes } from 'react-router'
import Home from './pages/home/Home'
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import Cart from './pages/cart/Cart'
import Footer from './components/footer/Footer'
import Loginpopup from './components/loginpopup/Loginpopup'
import Verify from './pages/varify/Verify.jsx'
import Myorders from './pages/myOrders/Myorders.jsx'


export default function App() {
  const [showlogin , setShowlogin] = useState(false);
  return (
    <>
    {
      showlogin?<Loginpopup setshowlogin={setShowlogin}/>:<></>
    }
    <div className='app'>
      <NavBar setshowlogin={setShowlogin}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/cart' element={<Cart /> } />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<Myorders />}/>
      </Routes>
    </div>
    <Footer />
    </>
  )
}
