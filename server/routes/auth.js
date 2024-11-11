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

        if(!email || !password){
            return res.status(400).json({error:"please fill the data"});
        }

        const user=await User.findOne({email:email});

        if(user){
            const isMatch=await bcrypt.compare(password,user.password);

            if(isMatch){
                res.status(200).json({message:"user login successfully"});
            }else{
                res.status(400).json({error:"invalid credentials"});
            }
        }else{
            res.status(400).json({error:"invalid credentials"});
        }
    } catch (error) {
        res.status(400).json({error:error});
    }
})

export default authRoute;
