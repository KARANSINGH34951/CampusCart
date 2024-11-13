import express from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt'


const authRoute=express.Router();

authRoute.post("/register", async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    // Check if all required fields are provided
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please fill all required fields",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: "Email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const registerUser = new User({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user
    const savedUser = await registerUser.save();
    const userdetails= await User.findOne({email}).select("userName email").exec()


    if (savedUser) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        userdetails
      });
    }
  } catch (error) {
    // Send a standardized error response
    res.status(500).json({
      success: false,
      error: "An error occurred during registration",
      details: error.message, // Optional, for debugging
    });
  }
});


authRoute.post("/login", async (req,res)=>{
    try {
        const {email,password}=req.body;
    
        const user=await User.findOne({email})
        if(user){
          const comparepassword =await bcrypt.compare(password,user.password)
          
            if(comparepassword){
              //create token
    
              const token=jsonwebtoken.sign({_id:user._id,email:user.email},"karan@123",{expiresIn:"2h"});
    
              //add the token inside the cookies as the response to the user
    
              res.cookie("token",token,{httpOnly:true})
              res.json({message:"login successfull",user})
            }
            else{
              res.send("email or password is wrong")
            }
        }   
      } catch (error) {
        res.status(401).send("Unauthorized request");
      }
})



export default authRoute;
