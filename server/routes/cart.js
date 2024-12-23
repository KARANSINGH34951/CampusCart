import express from "express";
import Product from '../models/product.js';
import Cart from '../models/cart.js';
const router = express.Router();

router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error.", error: error.message });
  }
});

export default router;
