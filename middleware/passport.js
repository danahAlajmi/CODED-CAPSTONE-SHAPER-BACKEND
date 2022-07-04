require("dotenv").config();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    const passwordsMatch = user
      ? bcrypt.compareSync(password, user.password)
      : false;
    if (passwordsMatch) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (jwtpayload, done) => {
    // if (Date.now() > jwtpayload.exp) {
    //   done(null, false);
    // }
    try {
      const user = await User.findById(jwtpayload._id);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error);
    }
  }
);
