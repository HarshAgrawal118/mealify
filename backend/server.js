import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/Userroute.js';
import 'dotenv/config'
import cartrouter from './routes/Cardroute.js';
import orderrouter from './routes/OderRoute.js';
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// serve uploaded images from /images path
app.use('/images', express.static('uploads'));

// API endpoint routes
app.use('/api/food', foodRouter);
app.use('/api/user',userRouter);
app.use('/api/cart',cartrouter);
app.use('/api/order',orderrouter);

// test route
app.get('/', (req, res) => {
  res.send("API Working");
});

// connect to DB
connectDB();

// start server —  this should always be LAST
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
