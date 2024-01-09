const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Giver = require('../models/model')

module.exports = function(passport) {
    passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  async(accessToken, refreshToken, profile, done) => {
    // Code to handle user authentication and retrieval using profile data
    //Find or create user
    let name = profile.displayName
    let google_id = profile.id
    let email = profile.emails[0].value
    
    const [user, created] = await Giver.findOrCreate({
      where: { email },
      defaults: {name, google_id}
    });
    if(created){
      console.log(`User created:${user.name} `)
    }else if(!created) {
      console.log(`User found: ${user.name}`)
    }


    return done(null, profile);
  }
));

//No serialization needed since we're not using sessions
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await userModel.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });
};
