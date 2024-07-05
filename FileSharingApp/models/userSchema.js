const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username : {
      type : String,
      required : true,
      unique : true,
    },
    email: {
      type: String,
      required: true,
      unique : true,
    },
    password: {
      type: String,
    },
    fullname: {
      type: String,
      required: true,
    },
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'File',
      },
    ],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);
  