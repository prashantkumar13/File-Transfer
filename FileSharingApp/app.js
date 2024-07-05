const express = require('express');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require("body-parser")

const app = express();

const dotenv = require('dotenv');
dotenv.config();
//port
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

app.use(flash());
// Middleware for parsing JSON and urlencoded data and managing sessions

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./config/passport');

// Define routes

// const upload= require('./routes/upload');
// const show = require('./routes/show');
const downloadRouter = require('./routes/download');
const indexRouter = require('./routes/index');

app.use('/', indexRouter);
app.use('/file',downloadRouter);
// app.use('/files',show);


app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})