import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'
const List = ({url}) => {
  const [list,setlist] = useState([]);
  const fetchlist = async ()=>{
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setlist(response.data.data)
    }else{
      toast.error("Error")
    }
  }
  useEffect(()=>{
       fetchlist();
  },[]);

  const removeFood = async(foodId)=>{
      const res = await axios.post(`${url}/api/food/remove`,{id:foodId});
      await fetchlist();
      if(res.data.success){
            toast.success(res.data.message);
      }else{
            toast.error('error');
      }
  }
  return (
    <div className='list add flex-col'>
      <p>All-Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                   <img src={`${url}/images/`+item.image}></img>
                   <p>{item.name}</p>
                   <p>{item.category}</p>
                   <p>${item.price}</p>
                   <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default List