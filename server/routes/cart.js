import Cart from "../models/cart";
import Product from "../models/product";

// Add to Cart
export const addToCart = async (req, res) => {
  const { userId } = req.user; 
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    await cart.addItem(productId, quantity);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
