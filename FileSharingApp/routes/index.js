var express = require('express');
var router = express.Router();
const multer = require('multer');

const fileModel = require('../models/fileSchema');
const userModel = require('../models/userSchema');

const passport = require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

const upload = require('./multer');

/* GET home page. */

// Route to handle the file upload using the Multer instance
router.post('/upload',isLoggedIn, async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: 'File too large. Max size is 1MB' });
            }
            return res.status(400).json({ message: err.message });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(400).json({ message: err });
        }

        // No file uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        try {
            // Find the user based on the session (assuming user is logged in)
            const user = await userModel.findOne({ username: req.session.passport.user });

            // Create a new file document
            const fileData = new fileModel({
                fileName: req.file.originalname,
                path: req.file.path,
                size: req.file.size,
                userId: user._id,
                mimetype: req.file.mimetype,
            });

            // Save file reference to user
            user.files.push(fileData._id);
            await user.save();

            // Generate file link
            const fileLink = `${process.env.APP_BASED_URL}/file/${fileData._id}`;
            fileData.link = fileLink;

            // Save file data to database
            const savedFile = await fileData.save();

            // Respond with success message and saved file data
            return res.status(201).json({ message: 'File uploaded successfully', savedFile });
        } catch (err) {
            // Handle database or other errors
            return res.status(500).json({ error: err.message });
        }
    });
});


router.get('/profile', isLoggedIn,async function(req, res) {
  const user = await userModel.findOne(req.user).populate('files');
  res.status(201).json({user});
});

router.post('/register', (req, res) => {
    const { username,fullname, email, password} = req.body;

    // Check if all required fields are provided
    if (!username || !fullname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    // Create a new user instance
    const newUser = new userModel({ username, fullname, email });

    // Register the user using passport-local-mongoose
    userModel.register(newUser, password, (err, user) => {
      if (err) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
          return res.status(409).send('Email already exists');
        }
        return res.status(500).send(err.message);
      }
      passport.authenticate('local')(req, res, () => {
        res.send('Registered and logged in');
      });
    });
});

router.post('/login', passport.authenticate("local",{
    successRedirect : "/profile",
    failureRedirect : "/login",
    failureFlash : true,
    }), function(req, res) { 
});

router.get('/logout', function(req, res) {
  req.logOut(function(err){
    if(err) return next(err);
    req.flash('success', 'Logged out successfully');
    res.redirect('/login');
  })
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  req.flash("unauthentic user");
  //res.send('unauthentic user');
  res.redirect('/login');
}

module.exports = router;
