import express from "express";
import { Cart } from '../models/cart';
import Product from '../models/product';


const cartRouter=express.Router();

cartRouter.post("/getcart",async (req,res)=>{
  try {
    const {userId,productId}=req.body;
    if(!userId || !productId){
        return res.status(404).json({
        success:false,
        message:"Error",
})
    }

    const Product=await Product.findById(productId)

    if(!Product)return res.status(404).json({
      success:false,
      message:"Error",
})

    

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Error",
    })
    
  }
})


export default cartRouter;
