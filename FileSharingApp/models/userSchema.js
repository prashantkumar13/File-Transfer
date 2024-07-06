const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique : true,
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

userSchema.plugin(passportLocalMongoose,{usernameField : 'email'});

module.exports = mongoose.model('User',userSchema);
  