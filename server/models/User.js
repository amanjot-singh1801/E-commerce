const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {   
        yourname:{
          type:String,
          required:true,
        },
        username:{
          type: String,
          required: true, 
          unique: true 
        },
        email: {
        type: String,
        required: true,
        trim: true,
		    },
        password:{
          type: String,
          required: true,
        },
        accountType: {
          type: String,
        }
    }
);

module.exports = mongoose.model('User', UserSchema);