import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../fooditem/FoodItem'
export default function FoodDisplay({category}) {
    const {food_list} = useContext(StoreContext)
  return (
    <div className='foodDisplay' id='foodDisplay'>
    <h2>Top Dishes Near you</h2>
    <div className="food-display-list">
      {
        food_list.map((item,index)=>{
          if(category==="all" || category===item.category){
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          }
        })
      }
    </div>
    </div> 
  )
}
