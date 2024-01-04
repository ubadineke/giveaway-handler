const passport = require('passport')

exports.login = async (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/login' }),
    res.redirect('/giveaway');

    // res.status(200).json({
    //     message: "Login Successful"
    // })
}