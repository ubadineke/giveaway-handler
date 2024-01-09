const passport = require('passport')
const jwt = require('jsonwebtoken')
const {promisify} = require('util');
const sequelize = require('../config/db');
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
            where: { google_id: req.user.id } // Replace 'username' with the column name
        });
        //console.log(user)
        // let token = jwt.sign({
        //     data: user.giverId
        //     }, 'secret', { expiresIn: 60 }); // expiry in seconds
            //res.cookie('jwt', token)
        createSendToken(user.giver_id, res)
        res.redirect('/giveaway/')
   // }, 1000); // Adjust the delay based on the asynchronous operations inside createSendToken;
  //console.log(req.user)
  
};

exports.protect = async( req, res, next) => {
    let token;
    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
        console.log(token)
    }
    if(!token) {
        return next(res.status(401).json({message: "You're not logged in!. Please log in to get access"}))
    }

    let decoded;
    try{
        decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET) //returns the payload which is the user's id
        console.log(decoded)

    } catch(err){
    return res.status(401).json({
            status: 'fail',
            message: ["Invalid token, Please log in", {Error: err}]
        })
    }

    //const [currentUser] = await sequelize.query(`SELECT * FROM "Givers" WHERE giver_id = ${decoded.id}`,)
    const currentUser = await Giver.findOne({where: {giver_id: decoded.id}})
    if(!currentUser) {
        // return next(res.json({message: ["The user belonging to this token does not exist"]}))
        return res.status(401).json({
         status:  'fail',
         message: "The user belonging to this token does not exist"
     })
    }

    req.user = currentUser
    next();
}

exports.Home = (req, res) => {
    const user = { id: 123322323}
    createSendToken(user, res)
    res.redirect('/giveaway/login')
}

exports.Display = (req, res) => {
    const user = {id: 92903095}
    res.json({message: 'God Did'})
}
