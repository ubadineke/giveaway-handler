const passport = require('passport')
const jwt = require('jsonwebtoken')
const Giver = require('../models/model.js')

const signToken = id => { return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
})
};

const createSendToken = (user, res) => {
    const token = signToken(user);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: false
    };
    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.cookie('jwt', token, cookieOptions)
}
// Middleware function for Google authentication
exports.googleAuthMiddleware = passport.authenticate('google', { failureRedirect: '/login', session: false });

// Route handler function after successful authentication
exports.handleGoogleAuthCallback = async (req, res) => {
  // Logic after successful authentication

    //createSendToken(req.user, res)
    // console.log(res)
    // res.json({message:"gone"})
    //setTimeout(() => { 
        const user = await Giver.findOne({
            where: { googleId: req.user.id } // Replace 'username' with the column name
        });
        //console.log(user)
        // let token = jwt.sign({
        //     data: user.giverId
        //     }, 'secret', { expiresIn: 60 }); // expiry in seconds
            //res.cookie('jwt', token)
        createSendToken(user.giverId, res)
        res.redirect('/giveaway/')
   // }, 1000); // Adjust the delay based on the asynchronous operations inside createSendToken;
  //console.log(req.user)
  
};

exports.Home = (req, res) => {
    const user = { id: 123322323}
    createSendToken(user, res)
    res.redirect('/giveaway/login')
}

exports.Display = (req, res) => {
    const user = {id: 92903095}
    res.json({message: 'God Did'})
}
