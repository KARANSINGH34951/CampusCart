import express from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt'


const authRoute=express.Router();

authRoute.post("/register", async (req,res)=>{
   try {
    const {userName,email,password,role}=req.body;

    if(!userName || !email || !password){
        return res.status(400).json({error:"please fill the data"});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const registeruser=new User({
        userName,email,password:hashedPassword,role
    });

    const saveduser=await registeruser.save()

    if(saveduser){
        res.status(201).json({message:"user registered successfully"});
    }
    
   } catch (error) {
    res.status(400).json({error:error});
   }
})

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
