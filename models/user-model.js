const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CartItem = require('./CartItem'); // Import the CartItem model

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone:{
            type:Number,
            required:true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }], // Reference to CartItem model
        addresses: [
            {
              FlatNo:{ type: String,required:true },
              street: { type: String, required: true },
              city: { type: String, required: true },
              state: { type: String, required: true },
              zipCode: { type: String, required: true },
              country: { type: String, required: true },
            },
          ],

        Orders:[
            {
              products: [
                {
                  productName:{type: String, required: true },
                  image:{type:String,required:true},
                  productId: { type: String, required: true },
                  quantity: { type: Number, default: 1 },
                  color: { type: String, required: true },
                  price: { type: Number, required: true },
                  Subamount: { type: Number, required: true },
                },
              ],
              amount: { type: Number, required: true },
              status: { type: Number, default: 0, required: true },

            },
          ],
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Hashing password
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

// Token generation with JWT
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.yubiApparels
        );
    } catch (error) {
        console.error(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
