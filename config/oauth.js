const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  async(accessToken, refreshToken, profile, done) => {
    // Code to handle user authentication and retrieval using profile data
    //Create user if not existing
    //Return existing
    console.log(profile.displayName, profile.emails[0].value);
    console.log(accessToken, refreshToken)

    
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
};
