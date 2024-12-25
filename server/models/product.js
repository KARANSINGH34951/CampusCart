import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Free or Donate',
      'Books and Stationery',
      'Electronics',
      'Clothing and Merchandise',
      'Hostel Essentials',
      'Fitness and Sports',
      'Accessories',
      'Events and Tickets',
      'Art and Craft',
      'Services',
      'Health and Wellness',
      'Miscellaneous',
    ],
  },
  images: {
    type: [String],
    required: true,
    default: "https://via.placeholder.com/150", 
  },
  branch: {
    type: String,
    enum: ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical","Fire and Safety","Chemical","Aeronautical","Automobile","Biotechnology","Agriculture","Architecture","Bio Medical","Bio Technology","Chemical","Civil","Computer Science","Electrical","Electronics","Environmental","Fashion","Food Technology","Industrial","Information Technology","Instrumentation","Marine","Mechanical","Metallurgy","Mining","Nuclear","Production","Textile","Other"], 
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
