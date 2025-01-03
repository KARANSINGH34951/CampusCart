import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();

const PORT=process.env.PORT || 3000;

//connection of DB from other folder
import {dbConnect} from './dbConfig/dbConnect.js';
import authRoute from './routes/auth.js';
import productRoute from './routes/product.js';
import uploadRoute from './routes/uploads.js';
import adminRouter from './routes/admin.js';
import cartRouter from './routes/cart.js'

const app = express();

app.use(express.json());
app.use(cors({
  origin:"https://campuscart-campus-cart.up.railway.app",
  credentials:true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

//routes
app.use("/auth",authRoute);
app.use("/product",productRoute);
app.use("/upload",uploadRoute);
app.use("/admin",adminRouter);
app.use("/cart",cartRouter);

//connection of DB
dbConnect().then(()=>{
  console.log("database connected..");
  app.listen(PORT,()=>{
    console.log("server running..");
    
  })  
}).catch(err=>{
  console.log("error occur: ",err);
})

