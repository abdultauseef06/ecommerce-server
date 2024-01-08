import product from "../../models/Product-model";
const connectdb = require("./utils/database");

const handler = async (req, res) => {
    try {
        await connectdb(); // Call the connectdb function to establish a database connection
        let products = await product.find();
        res.status(200).json({ products }); // Respond with the fetched products
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = handler;
