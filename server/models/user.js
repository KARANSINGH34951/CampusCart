import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  branch: {
    type: String,
    enum: ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical","Fire and Safety","Chemical","Aeronautical","Automobile","Biotechnology","Agriculture","Architecture","Bio Medical","Bio Technology","Chemical","Civil","Computer Science","Electrical","Electronics","Environmental","Fashion","Food Technology","Industrial","Information Technology","Instrumentation","Marine","Mechanical","Metallurgy","Mining","Nuclear","Production","Textile","Other"], 
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", UserSchema);
