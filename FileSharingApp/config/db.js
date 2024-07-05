const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then((result) => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
}

module.exports = connectDB; 