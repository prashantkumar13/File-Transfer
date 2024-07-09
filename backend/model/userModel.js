import mongoose from 'mongoose'


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,

    },
    phone:{
        type:Number,
        required:false,

    },
},{timestamps:true})

export default mongoose.model("users",userSchema)
