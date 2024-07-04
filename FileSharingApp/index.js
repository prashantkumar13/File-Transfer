const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const upload= require('./routes/file');
const download = require('./routes/download');
const show = require('./routes/show');
const connectDB = require('./db/db');
connectDB();

const PORT = process.env.PORT || 3000;

app.use('/files',upload);
app.use('/files',download);
app.use('/files',show);


app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})