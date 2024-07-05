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
    role:{
        type:Number,
        default:0

    }
},{timestamps:true})

export default mongoose.model("users",userSchema)
