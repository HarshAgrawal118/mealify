import express from 'express'
import { addtocart,removefromcart,getcart } from '../controllers/Cartcontroller.js'
import Oathmiddleware from '../middleware/Oath.js'


const cartrouter = express.Router();

cartrouter.post('/add',Oathmiddleware,addtocart);
cartrouter.post('/remove',Oathmiddleware,removefromcart);
cartrouter.post('/get',Oathmiddleware,getcart);

export default cartrouter;