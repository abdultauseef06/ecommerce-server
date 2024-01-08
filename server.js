require("dotenv").config({ path: 'C:/Users/mohammed tauseef/OneDrive/Desktop/New folder/react/yubitesting/server/utils/.env' });
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const connectdb = require("./utils/database");
const contactRoute = require("./router/contact-router");
const cartRoutes = require('./router/Cart-route');
const productRoutes = require('./router/product-route');
const orderRoutes = require('./router/Order-route');
const AddressRoute = require('./router/Address-route');
const corsOptions = {
  origin: "http://localhost:3001",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD", // Corrected to a space-separated string
  credentials: true,
};

app.use(cors(corsOptions)); // Invoke cors middleware
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use('/api/cart', cartRoutes);
app.use('/api', productRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/contacts',contactRoute);
app.use('/api/address',AddressRoute);
const PORT = 5000;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});
