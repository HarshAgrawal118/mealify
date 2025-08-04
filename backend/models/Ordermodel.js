import mongoose from 'mongoose';

const Orderschema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "food processing" }, // ✅ typo fixed
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false }
});

// ✅ Always define model with safe fallback
const orderModel = mongoose.models?.order || mongoose.model("order", Orderschema);

export default orderModel;
