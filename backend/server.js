import express from 'express'
import cors from 'cors';
// import { Router } from 'express';
import color from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from "./route/authRoute.js"
import fileRoute from "./route/fileRoutes.js"
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';


//configure env
dotenv.config();
//database  config
connectDB();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//rest object
const app=express()

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // This allows the browser to include cookies in requests
  }));
  

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/file", fileRoute);

//rest api
app.get('/',(req,res)=>{
    res.send('<h1 style="color:red">Server is running...</h1>')
})

//PORT
const PORT =process.env.PORT || 8080

//run listen
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`.bgCyan.white);
})
