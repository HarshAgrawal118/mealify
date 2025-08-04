import express from 'express'
import oathmiddleware from '../middleware/Oath.js'

import { placeorder, verification,userOrders, listorders, updatestatus } from '../controllers/Odercontroller.js'

const orderrouter = express.Router();

orderrouter.post('/place',oathmiddleware,placeorder);
orderrouter.post('/verify',verification);
orderrouter.post("/userorders",oathmiddleware,userOrders)
orderrouter.get('/list',listorders);
orderrouter.post('/status',updatestatus)
export default orderrouter;