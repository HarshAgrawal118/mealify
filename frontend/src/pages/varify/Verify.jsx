import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const success =  searchParams.get('success');
    const orderId =  searchParams.get('orderId');
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();
    const verifypayment = async()=>{
        const res = await axios.post(url+'/api/order/verify',{success,orderId});
        if(res.data.success){
            navigate('/myorders');
        }else{
            navigate('/')
        }
    }

    useEffect(()=>{
         verifypayment();
    },[])
  return (
    <div className='verify'>
        <div className="spinner">

        </div>

    </div>
  )
}

export default Verify