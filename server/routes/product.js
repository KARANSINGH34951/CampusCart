import express from "express";
import Product from '../models/product.js';

const productRoute= express.Router();

productRoute.post("/createproduct",async (req,res)=>{
    try {
      const {name,description,price,category,branch,images,year}=req.body;
      const prouctsave=new Product({
        name,
        description,
        price,
        category,
        branch,
        year,
        images,
        createdBy: req.user._id
      })

      await prouctsave.save();
      res.status(201).json({sucess:true,
        message:"Product Created Sucessfully"
      })
    } catch (error) {
      console.log(error);
    }
})

productRoute.get("/getproducts", async (req, res) => {
  try {
    const allProducts = await Product.find({}).populate("createdBy", "userName email").exec();

    res.status(200).json({
      success: true,
      message: "All products retrieved successfully",
      products: allProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products",
      error: error.message, 
    });
  }
});

export default productRoute;