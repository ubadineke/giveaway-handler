 GoogleStrategy = require('passport-google-oauth20').Strategy;
const Giver = require('../models/model')
module.exports = function(passport) {
    passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  async(accessToken, refreshToken, profile, done) => {
    // Code to handle user authentication and retrieval using profile data
    console.log(accessToken, refreshToken)
    //Create or Return Existing User 
    let email = profile.emails[0].value
    let name = profile.displayName;
    let googleId = profile.id
    
    const [user, created] = await Giver.findOrCreate({
      where: { email },
      defaults: {name, googleId}
    })

    if (created) {
      console.log('New user created:', user.name);
      // Handle new user creation logic here if needed
    } else {
      console.log('User found:', user.name);
    }

    //console.log(profile);
    //console.log(accessToken, refreshToken)
    
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
  //console.log(user)
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Giver.findOne({ where: {googleId: id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
};
