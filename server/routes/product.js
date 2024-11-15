import express from "express";
import Product from '../models/product.js';

const productRoute= express.Router();

productRoute.post("/create",async (req,res)=>{
    try {
      const {name,description,price,category,stock,images,ratings}=req.body;
      const prouctsave=new Product({
        name,
        description,
        price,
        category,
        stock,
        images,
        ratings
      })

      await prouctsave.save();
      res.status(201).json({sucess:true,
        message:"Product Created Sucessfully"
      })
    } catch (error) {
      console.log(error);
      
    }
})

productRoute.get("/getproducts",async (req,res)=>{
  const allProducts=await Product.find({});

  res.status(200).json({
    success:"true",
    message:"all user deliver",
    allProducts
  })
})

export default productRoute;