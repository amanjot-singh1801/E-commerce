const jwt = require("jsonwebtoken");
require("dotenv").config(); 
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
    try{

        console.log("IN auth");
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        console.log("Token ");

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);        
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}


exports.isAdmin = (req,res,next)=>{
    try{    
        console.log("Printing AccountType ", req.user.accountType);
        if(req.user.accountType !== "admin") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Admin only',
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
}

