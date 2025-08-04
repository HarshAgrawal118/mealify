import React, { useContext, useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
export default function Loginpopup({setshowlogin}) {

  const {url,settoken} = useContext(StoreContext)


  const[currentstate , setcurrentstate] = useState("login");
  const[data,setdata] = useState({
    name:'',
    email:'',
    password:''
  })
  const onchangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setdata(data=>({...data,[name]:value}))

  }

  const onlogin = async(e)=>{
         e.preventDefault();
         let newUrl = url;
         if (currentstate == 'login') {
          newUrl += "/api/user/login" 
         }else{
          newUrl += "/api/user/register"
         }
         const res = await axios.post(newUrl,data);
         if (res.data.success) {
           settoken(res.data.token);
           localStorage.setItem('token',res.data.token)
           setshowlogin(false)
         }
         else{
          alert(res.data.message)
         }
  }

  return (

    <div className='login-popup'>
      <form action="" onSubmit={onlogin} className='loginpopup-container'>
        <div className="loginpopup-title">
          <h2>
            {currentstate}
            
          </h2>
          <img src={assets.cross_icon} alt="" onClick={() => setshowlogin(false)} />
        </div>
        <div className="loginpopup-input">
          {currentstate==="login"?<></>: <input type="text" name='name' onChange={onchangeHandler} value={data.name} placeholder='Your Name' required/>}
          <input name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Your Email' required/>
          <input type="password" placeholder='password' name='password' onChange={onchangeHandler} value={data.password} required/>
        </div>
        <button type='submit'>
          {
            currentstate==="signup"?"create account":"login"
          }
        </button>
        <div className="loginpopup-condition">
          <input type="checkbox" required/>
          <p>
            Lorem ipsum dolor sit a, id molestias! Placeat!
          </p>
        </div>
        {currentstate==="login"?<p>Create a new Account? <span onClick={()=>setcurrentstate("signup")}>click here!</span></p>:
               <p>Already have an account?<span onClick={()=>setcurrentstate("login")}>login here</span></p>}
        
 
      </form>
    </div>
  )
}
