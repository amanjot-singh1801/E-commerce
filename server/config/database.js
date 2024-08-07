const mongoose = require("mongoose");
require("dotenv").config();


exports.connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("Database Connected Successfully")})
    .catch( (error) =>{
        console.log("Connection with database failed")
        console.log(error);
        process.exit(1);
    })
};
