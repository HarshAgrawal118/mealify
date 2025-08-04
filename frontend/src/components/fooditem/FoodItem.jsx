import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets.js'
import { StoreContext } from '../../context/StoreContext.jsx';
export default function FoodItem({id,name,price,description,image}) {

    const {cartitems ,addcart,removecart,url} = useContext(StoreContext); 
  return (
    <div className='fooditem'>
        <div className="food-item-image-container">
            <img src={url+"/images/"+image} alt="" className='food-item-image'/>
            {
                !cartitems?.[id]?
                <img src={assets.add_icon_white} alt="" className='add' onClick={()=>addcart(id)}/>
                : <div className='food-item-container'>
                    <img onClick={()=>removecart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartitems[id]}</p>
                    <img onClick={()=>addcart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className='food-item-name-rating'>
                 <p>{name}</p>
                 <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-desc'>
                {
                    description
                }
            </p>
            <p className="food-item-price">
                ${price}
            </p>
        </div>
    </div>
  )
}
