const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileName : {
        type : String,
        require: true
    },
    path : {
        type : String,
        require : true,
    },
    size : {
        type : Number,
        require : true,
    },
    uuid : {
        type : String,
        require : true,
    },
    sender : {
        type : String,
        require : false,
    },
    receiver : {
        type : String,
        require : false,
    }  
},{timestamps : true});

const fileModel = new mongoose.model("File",fileSchema);

module.exports = fileModel;

