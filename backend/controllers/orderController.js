import orderModel from "../models/orderModel.js"; 
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from 'dotenv'
dotenv.config()


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place Order Function
const placeOrder = async (req, res) => {
 const frontend_url = process.env.frontend_url

  try { 
    // Create a new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Save the order in the database
    await newOrder.save();

    // Clear the user's cart data
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Create line items for Stripe session
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100*80
         // Convert to paise
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "INR",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 49 * 100,
      },
      quantity: 1,
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
    //  payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
   

    });
    console.log("seession print ho rha ha",session)

    // Send the session URL as a response
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
 
 
// Verify Order Function
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};



 // User Orders Function
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// listing orders fro admin
const listOrders = async (req,res) => {
try{
  const orders = await orderModel.find({});
  res.json({success:true,data:orders})
} catch(error){
    res.json({success:false,message:"Error"})
}
}

// api for update order status 
const updateStatus = async (req,res) => {
  try{
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
  }catch(error){
   console.log(error);
   res.json({success:false,message:"Error"})
  }
}

export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus };
