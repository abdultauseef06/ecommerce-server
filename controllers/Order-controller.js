const Order = require('../models/Order-model');
const User = require("../models/user-model");

// Controller to add an order
const addOrder = async (req, res) => {
  try {
    const { username,name, email, phone,color, userId,image, products,productName, addresses, status } = req.body;

    // Calculate the total amount and include 'color' for each product
    const totalAmount = products.reduce((sum, product) => {
      const Subamount =  product.price;
      product.Subamount = Subamount; // include 'Subamount' for each product
      return sum + Subamount;
    }, 0);



    const user = await User.findOneAndUpdate(
        { email },
        {
          $push: {
            Orders: {
              image,
              productName,
              color,
              products,
              amount: totalAmount,
              status,
              
            },
          },
          
        },
        { new: true }
      );

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

    // Create a new order instance
    const newOrder = new Order({
      image,
      username,
      email,
      phone,
      userId,
      products,
      color,
      productName,
      addresses,
      amount: totalAmount,
      status
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all orders
const getOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addOrder,
  getOrders
};
