const express = require('express');
const router = express();
const File = require('../models/fileSchema');

router.get('/:uuid',async(req,res)=>{
    try{
        const file = await File.findOne({uuid : req.params.uuid});
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