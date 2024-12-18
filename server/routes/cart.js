import express from "express";
import { Cart } from "../models/cart";
import Product from "../models/product";

const cartRouter = express.Router();

// Route to add an item to the cart
cartRouter.post("/addtocart", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validate input
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Product ID are required.",
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Find the cart for the user
    let cart = await Cart.s({ userId });

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: "Product already in the cart.",
      });
    }

    // Add the product to the cart
    cart.items.push({ productId });
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully.",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the product to the cart.",
    });
  }
});

export default cartRouter;
