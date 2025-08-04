import orderModel from '../models/Ordermodel.js'
import userModel from '../models/Usermodel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPR_SECRET_KEY)

//placing user orer from frontend

const placeorder = async(req,res)=>{
    const frontend_url = "http://localhost:5174";
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save(); 
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
          const line_items = req.body.items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100 * 80, // ⚠️ 100*80 = ₹ conversion? Be sure!
        },
        quantity: item.quantity,
      };
    })
    line_items.push({
        price_data:{
            currency:'inr',
            product_data:{
                name:'delivery charges'
            },
            unit_amount:2*100*80
        },
        quantity:1 
    })
    const session =await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    })

    res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
        
    }
}

const verification = async(req,res)=>{
   const {orderId,success}=req.body;
   try {
    if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({success:true,message:"paid"})
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false,message:"not paid"});
    }
   } catch (error) {
    console.log(error);
    res.json({success:false,message:'error'})
    
   }
}


//userOrder for frontend
const userOrders = async(req,res)=>{
   try {
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:'error'})
    
   }
}

//listing orders for admin panel
const listorders = async(req,res)=>{
     try {
      const orders = await orderModel.find({});
      res.json({success:true,data:orders})
     } catch (error) {
      console.log(error);
      res.json({success:false,message:'error'})      
     }
}


//api for updating order status
const updatestatus = async(req,res)=>{
   try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:'status updated'})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:'error'})
    
   }
}


export {placeorder,verification,userOrders,listorders,updatestatus}