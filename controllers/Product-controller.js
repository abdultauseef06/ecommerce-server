const Product = require("../models/Product-model");
const slugify = require('slugify');
const uuid = require('uuid');

// Controller to get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get a single product by ID
const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    console.log('Fetching product with ID:', productId);
    
    // Use findById to retrieve a single document by ID
    const product = await Product.find( {id:productId});

    console.log('Retrieved product:', product);

    // Check if the product is null (not found)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductByQuery = async (req, res) => {
  const query = req.query;

  try {
    // Check if 'slug' is present in the query and use it directly without casting to ObjectId
    const products = 'slug' in query ? await Product.find({ slug: query.slug }) : await Product.find(query);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




const createProduct = async (req, res) => {
  const { name,price, colors, image,company, description, category, featured, stock, reviews, stars } = req.body;

  const id = uuid.v4();
  const slug = slugify(name, { lower: true });


  try {
    const newProduct = await Product.create({
      name,
      id,
      slug,
      price,
      colors,
      image,
      company,
      description,
      category,
      featured,
      stock,
      reviews,
      stars,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Controller to update a product by ID
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updateData = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to delete a product by ID
const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getProducts,
  getProductById,
  getProductByQuery,
  createProduct,
  updateProduct,
  deleteProduct,
};
