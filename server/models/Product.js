const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        productName:{
            type:String,
            required:true,
            trim:true,
        },
        productDescription:{
            type:String,
            require:true,
        },
        price: { 
            type: Number,
            required: true
        },
        category: [{
            type:String,
            required:true
        }],
        image: { 
            type: String 
        }
    }
)

module.exports = mongoose.model("Product",ProductSchema);