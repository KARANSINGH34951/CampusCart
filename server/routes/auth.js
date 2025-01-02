import express from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt'
import jsonwebtoken from "jsonwebtoken"


const authRoute=express.Router();

authRoute.post("/register", async (req, res) => {
  try {
    const { userName, email, password, role = 'user' } = req.body; // Default role

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

    if (savedUser) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Failed to save user",
      });
    }

  } catch (error) {
    console.error("Registration error:", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      error: "An error occurred during registration",
      details: error.message,
    });
  }
});


authRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const comparepassword = await bcrypt.compare(password, user.password);

      if (comparepassword) {
        // Create token
        const token = jsonwebtoken.sign(
          { _id: user._id, email: user.email },
          "karan@123",
          { expiresIn: "2h" }
        );

        // Add the token inside the cookies as the response to the user
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 2 * 60 * 60 * 1000, 
        });

        console.log(user._id);
        
        res.json({
          success: true,
          message: "Login successful",
          userId: user._id, 
          userName: user.userName,
          email: user.email,
          role: user.role,
        });
      } else {
        res.status(400).json({ success: false, message: "Email or password is incorrect" });
      }
    } else {
      res.status(400).json({ success: false, message: "Email or password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


authRoute.get("/logout", async (req, res) => {
  try {
    // Clear the cookie named "token"
    res.clearCookie("token", {
      httpOnly: true, // Match options with how the token was set
      secure: true, // Include this only if you're using HTTPS
      sameSite: "strict", // SameSite policy for added security
    });

    // Send a success response
    res.status(200).send({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.error("Error during logout: ", error);

    res.status(500).send({
      success: false,
      error: "An error occurred during logout.",
    });
  }
});


authRoute.authMiddleware=async(req,res,next)=>{
  const {token}= req.cookies
  if(!token){
    return res.status(401).json({
      success:false,
      message:"Unauthorised User !"
    })
  }

  try {
    const decode=jsonwebtoken.verify(token,"karan@123");
    req.user=decode;
    next();
  } catch (error) {
    return res.status(401).json({
      success:false,
      message:"Unauthorised User !"
    })
  }
}


export default authRoute;
