import mongoose from "mongoose";



export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://ag8606347:shivaay0000h@cluster0.wvd0cxc.mongodb.net/mealify').then(()=>console.log('DB Connected'))
}