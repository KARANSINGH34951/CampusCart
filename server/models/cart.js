import mongoose, { mongo } from "mongoose"

const CartSchema= new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  items:[
    {
      productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
      }
    }
  ]
},{
  timestamps:true
})

export const Cart=mongoose.model("cart",CartSchema)
