const express = require('express');
const router = express();
const File = require('../models/fileSchema');

router.get('/',async(req,res)=>{
    try{
        const files = await File.find();
        if(!files){
            return res.status(500).json({error : err.message});
        }

        res.json(files);
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
})

module.exports = router;