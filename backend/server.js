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
const allowedOrigins = ['http://localhost:3000', 'https://mega-share.vercel.app']; // List your allowed origins here

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the request
    }
  },
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions)); // Apply the CORS middleware

  

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
