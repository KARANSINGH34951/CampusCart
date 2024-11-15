import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();

//connection of DB from other folder
import {dbConnect} from './dbConfig/dbConnect.js';
import authRoute from './routes/auth.js';
import productRoute from './routes/product.js';

const app = express();

app.use(express.json());
app.use(cors({
  origin:"*",
  credentials:true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

//routes
app.use("/auth",authRoute)
app.use("/product",productRoute)

//connection of DB
dbConnect().then(()=>{
  console.log("database connected..");
  app.listen(3000,()=>{
    console.log("server running..");
    
  })  
}).catch(err=>{
  console.log("error occur: ",err);
})

