import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { useNavigate } from 'react-router';
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
export default function PlaceOrder() {
  const {getTotalCartamt,token,food_list,cartitems,url} = useContext(StoreContext);
  const [data,setdata] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onchangehandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setdata(data=>({...data,[name]:value}))
  }

const placeorder = async (e) => {
  e.preventDefault();

  if (!cartitems || Object.keys(cartitems).length === 0) {
    alert("Cart is empty");
    return;
  }

  let OrderItem = [];

  food_list.forEach((item) => {
    if (item && item._id && cartitems[item._id] > 0) {
      const itemInfo = { ...item, quantity: cartitems[item._id] };
      OrderItem.push(itemInfo);
    }
  });

  if (OrderItem.length === 0) {
    alert("No valid cart items");
    return;
  }

  const orderdata = {
    address: data,
    items: OrderItem,
    amount: getTotalCartamt() + 2
  };

  try {
    const res = await axios.post(`${url}/api/order/place`, orderdata, {
      headers: {
        token:token
      }
    });

    console.log("📦 Order Response:", res.data);

    if (res.data.success) {
      const { session_url } = res.data;
      window.location.replace(session_url);
    } else {
      alert('❌ Server responded with failure');
    }
  } catch (err) {
    console.error("🚨 Axios error:", err.response?.data || err.message);
    alert("❌ Error placing order");
  }
};

const navigate = useNavigate();

useEffect(()=>{
  if(!token){
   navigate('/cart')
  }else if(getTotalCartamt()===0){
         navigate('/cart')
  }
},[token])

  return (
    <form className='placeorder' onSubmit={placeorder}>
      <div className="placeorder-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' value={data.firstName} onChange={onchangehandler} type="text" placeholder='First name'/>
          <input required name='lastName' value={data.lastName} onChange={onchangehandler} type="text" placeholder='last name'/>
        </div>
        <input required type="text" name='email' value={data.email} onChange={onchangehandler} placeholder='Email address'/>
        <input required name='street' value={data.street} onChange={onchangehandler} type="text" placeholder='street'/>
        <div className="multi-fields">
          <input required onChange={onchangehandler} value={data.city} name='city' type="text" placeholder='city'/>
          <input required type="text" onChange={onchangehandler} value={data.state} name='state' placeholder='state'/>
        </div>
        <div className="multi-fields">
          <input required type="text" onChange={onchangehandler} value={data.zipcode} name='zipcode' placeholder='zipcode'/>
          <input required type="text" placeholder='country' value={data.country} name='country' onChange={onchangehandler}/>
        </div>
        <input required type="text"  placeholder='phone' value={data.phone} name='phone' onChange={onchangehandler}/>
      </div>
      <div className="placeorder-right">
      <div className="cart-total">
          <h2>cart total</h2>
          <div>
            <div className="carttotal-details">
              <p>subtotal</p>
              <p>${getTotalCartamt()}</p>
            </div>
            <hr />
            <div className="carttotal-details"><p>delivery fees</p>
              <p>{getTotalCartamt()===0?0:2}</p>
            </div>
            <hr />
            <div className="carttotal-details">
              <b>total</b><b>${getTotalCartamt()===0?0:getTotalCartamt()+2}</b>
            </div>

          </div>
          <button type='submit'>Proceed To payment</button>
        </div>
      </div>
    </form>
  )
}
