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
  stock: {
    type: Number,
    min: 0,
    default: 0,
  },
  images: {
    type: [String],
    required: true,
    default: "https://via.placeholder.com/150", 
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
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
