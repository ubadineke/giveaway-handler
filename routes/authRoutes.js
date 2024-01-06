const express = require('express')
const passport = require('passport');
const  {googleAuthMiddleware, handleGoogleAuthCallback}= require('../controllers/authController')
const router = express.Router();


//Entry 
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));


//Final point of login
router.get('/auth/google/callback', googleAuthMiddleware, handleGoogleAuthCallback
);

  router.get('/dashboard', async (req, res) => {
    if (!req.user) {
      return res.redirect('/');
    }
    const user = await userModel.findById(req.user.id);
    //res.render('dashboard', { user });
  });

  router.get('/logout', function(req, res){
    req.logout(function(err){
      if(err) return next(err);
      res.redirect('/');
    });
});



module.exports = router;