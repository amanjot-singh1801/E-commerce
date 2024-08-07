const User = require("../models/User");
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.signup = async (req, res) => {
    try{

        const { yourname,username,email,password,accountType }  = req.body;

        
        if(!yourname || !username ||  !email || !password){
            return res.status(400).send({
				success: false,
				message: "All Fields are required",
			});
        }

        const existingUserName = await User.findOne({username});
        if(existingUserName){
            return res.status(409).json({
                success:false,
                messsage:"Change your username , this username is already present",
            })
        }
        let userAccountType = "admin";

        if(!accountType){
            userAccountType = "user";
        }
        const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            yourname,
            username,
            email,
            password: hashedPassword,
            accountType:userAccountType,
        });

        return res.status(200).json({
            success:true,
            message:"User Registerd Successfully",
        })

    }catch(error){
        console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered.",
		});
    }
}

exports.login = async(req,res) => {  
    try{

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All Fields are required",
            })
        }

        const user = await User.findOne({email});
        console.log("user",user);
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered, please signup to continue",
            })
        }

        console.log("Login");
        if(await bcrypt.compare(password,user.password)){
            const token = jwt.sign(
                { email: user.email, id: user._id, accountType: user.accountType },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );

            user.token = token;
            user.password = undefined;  

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
        }else{
            return res.status(401).json({
            success: false,
            message: `Password is incorrect`,
            });
        }
    }catch(error){
        console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
    }
}