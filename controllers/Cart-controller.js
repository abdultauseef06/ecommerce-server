// controllers/cart-controllers.js
const CartItem = require('../models/CartItem');

const addToCart = async (req, res) => {
    console.log('Request received at addToCart controller');
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the item already exists in the cart
    const existingCartItem = await CartItem.findOne({ userId, productId });

    if (existingCartItem) {
      // Update the quantity if the item already exists
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      // Add a new item to the cart
      await CartItem.create({ userId, productId, quantity });
    }

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve the user's cart
    const userCart = await CartItem.find({ userId }).populate('productId');

    res.status(200).json({ cart: userCart });
  } catch (error) {
    console.error('Error getting user cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addToCart, getCart };
