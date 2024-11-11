import mongoose from 'mongoose';

export const dbConnect=async ()=> {
 await  mongoose.connect('mongodb://127.0.0.1:27017/campuscart')
}