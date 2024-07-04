const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const File = require('../models/fileSchema');

let storage = multer.diskStorage({
    //cb->callback;
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        ///generate unique name
        const uniqueName = `${Date.now()}_${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const maxSize = 1 * 1000 * 1000;
 
let upload = multer({
    storage: storage,
    limits: { fileSize: maxSize }
 
    // mypic is the name of file attribute
}).single("myfile");
 
///upload a file
router.post('/upload',(req,res)=>{

    ///upload file in database;
    upload(req,res, async(err)=>{
        ///check validation
        if(!req.file){
            return res.status(400).json({error : "please attach a file!"});
        }

        try{
            ///store into the db
            const file = new File({
                fileName : req.file.originalname,
                path : req.file.path,
                uuid : uuidv4(),
                size : req.file.size,
            });

            const response = await file.save();
            ///response ->link
            return res.status(201).json({fileLink : `${process.env.APP_BASED_URL}/files/${response.uuid}`});
            ///http://localhost:3000/upload/files/adejke-slfdf-lefef-lkfk
        }
        catch(err){
            res.status(500).json({error : err.message});
        }
    });
});


module.exports = router;