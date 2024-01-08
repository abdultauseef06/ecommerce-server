const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {   
        username:{type:String,required:true},
        email:{type:String,required:true},
        phone:{type:Number,required:true},
        products:[
            {  
                image:{type:String,required:true},
                productName:{type:String,required:true},
                productId:{type:String,required:true},
                color:{type:String,required:true},
                quantity: {type:Number, default:1},
                price:{type:Number,required:true}
            }
        ],
        addresses:[
            {
              FlatNo:{ type: String,required:true },
              street: { type: String, required: true },
              city: { type: String, required: true },
              state: { type: String, required: true },
              zipCode: { type: String, required: true },
              country: { type: String, required: true },
            },
          ],
        amount:{type:Number,required:true},
        status:{type:String, default:'pending',required:true},
    },{timestamps:true}
);

const Order = mongoose.model("Order",OrderSchema)

module.exports = Order;