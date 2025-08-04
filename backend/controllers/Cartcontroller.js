import userModel from '../models/Usermodel.js'


// add items to cart
const addtocart = async (req, res) => {
  try {
    let userdata = await userModel.findById(req.body.userId);
    let cartData = userdata.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: 'Added to cart' });
  } catch (error) {
    console.log('Add to cart error:', error);
    res.json({ success: false, message: 'Error2' });
  }
};

//remove from cart
const removefromcart = async(req,res)=>{
     try {
        let userdata = await userModel.findById(req.body.userId);
        let cartData = await userdata.cartData || {};
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:'remove from cart'})
     } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'})
        
     }
}

//fetch items from cart

const getcart = async (req, res) => {
  try {
    const userdata = await userModel.findOne({ _id: req.body.userId });

    if (!userdata) {
      return res.json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      cartData: userdata.cartData || {},
    });
  } catch (error) {
    console.log('Get cart error:', error);
    res.json({ success: false, message: 'Error fetching cart data' });
  }
};



export {addtocart,getcart,removefromcart}

