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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    receiver : {
        type : String,
        require : false,
    },
    link : {
        type : String,
        require : true,
    },
    mimetype: {
        type : String,
        require : true,
    },

},{timestamps : true});

const fileModel = new mongoose.model("File",fileSchema);

module.exports = fileModel;

