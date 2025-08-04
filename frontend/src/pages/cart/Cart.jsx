import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router'
export default function Cart() {
  const { food_list, cartitems, removecart, getTotalCartamt,url } = useContext(StoreContext)
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cartitems-title">
          <p>items</p>
          <p>title</p>
          <p>price</p>
          <p>quantity</p>
          <p>total</p>
          <p>remove</p>

        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartitems[item._id] > 0) {
              return (
                <div>
                  <div className='cartitems-title cart-items-item'>
                    <img src={url+'/images/'+item.image} alt="" />
                    <p>{
                      item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartitems[item._id]}</p>
                    <p>${item.price * cartitems[item._id]}</p>
                    <p className='cross' onClick={() => removecart(item._id)}>x</p>
                  </div>
                  <hr />
                </div>

              )
            }
          })
        }
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => navigate('/order')}>Proceed To Checkout</button>
        </div>
        <div className="cart-promo">
          <div>
            <p>if you have a promo cose enter here</p>
            <div className="cartpromo-input">
              <input type="text" placeholder='Promo code' />
              <button> Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
