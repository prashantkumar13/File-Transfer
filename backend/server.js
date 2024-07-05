import express from 'express'
import { Router } from 'express';
import color from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from "./route/authRoute.js"
import cookieParser from 'cookie-parser';


//configure env
dotenv.config();
//database  config
connectDB();

//rest object
const app=express()

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());


//routes
app.use("/api/v1/auth", authRoute);

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
