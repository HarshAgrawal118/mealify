import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'
export default function ExploreMenu({category , setCategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum repellendus qui quaerat sequi corrupti! Laborum fuga tempora odio, similique iste dolorum libero omnis voluptatem, quas placeat </p>
      <div className="explore-menu-list">
        {
            menu_list.map((item,index)=>{
                return(
                    <div key={index} className='explore-menu-list-item' onClick={()=>setCategory(prev=>prev===item.menu_name?"all":item.menu_name)}>
                        <img src={item.menu_image} className={category===item.menu_name?"active":""}/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })
        }
      </div>
      <hr />
    </div>
  )
}
