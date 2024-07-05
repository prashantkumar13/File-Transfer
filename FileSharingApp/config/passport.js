const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/userSchema');

passport.use(new LocalStrategy(userModel.authenticate()));

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());