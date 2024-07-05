const express = require('express');
const router = express();
const fileModel = require('../models/fileSchema');

router.get('/:id',async(req,res)=>{
    try{
        const file = await fileModel.findOne({_id : req.params.id});
        if(!file){
            return res.status(404).json({error : err.message});
        }

        const filePath = `${__dirname.file}/../${file.path}`;
        res.download(filePath);
        // res.json(file);
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
})

module.exports = router;