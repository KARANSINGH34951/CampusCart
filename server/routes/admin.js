import express from 'express';  
import { User } from '../models/user.js';

const adminRouter = express.Router();

adminRouter.get("/",async (req,res)=>{
try {
  const users=await User.find({role:"user"}).select("-password");

  if(!users) return res.status(400).json({
    success:false,
    message:"no users found"
  });
  
  res.status(200).json({
    success:true,
    message:"all users sent",
    users});
} catch (error) {
  res.status(500).json({
    success:false,
    message:error.message
  });
}
})

adminRouter.delete("/:id",async (req,res)=>{
try {
  const
  user=await User.findByIdAndDelete(req.params.id);
  if(!user) return res.status(400).json({
    success:false,
    message:"user not found"
  });
  res.status(200).json({
    success:true,
    message:"user deleted",
    user
  });
} catch (error) {
  res.status(500).json({
    success:false,
    message:error.message
  });
}
})

adminRouter.get("/filter",async (req,res)=>{
  console.log("filter")

})

export default adminRouter;