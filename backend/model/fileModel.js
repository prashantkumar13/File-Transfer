import mongoose from "mongoose";


const fileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    files: [
        {
            filename: {
                type: String,
                required: true,
            },
            fileUrl: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                required: true,
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },

},{timestamps:true})

export default mongoose.model('files', fileSchema);