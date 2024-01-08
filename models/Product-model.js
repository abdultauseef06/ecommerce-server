const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        id:{ type: String, unique: true },
        slug:{ type: String, unique: true },
        price: {type: Number, required: true},
        colors: {type: [String], required: true},
        company:{type:String,require:true},
        image: [
            {
                id: {type: String},
                width: {type: Number},
                height: {type: Number},
                url: {type: String},
                filename: {type: String},
                size: {type: Number},
                type: {type: String},
            }
        ],
        description: {type: String, required: true},
        category: {type: String, required: true},
        featured: {type: Boolean},
        stock: {type: Number, required: true},
        reviews: {type: Number},
        stars: {type: Number},
    },
    {timestamps: true}
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
