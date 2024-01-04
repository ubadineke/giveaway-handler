const express = require('express')
const passport = require('passport');
const authController = require('../controllers/authController')

const router = express.Router();

//App Entry point for sign/log iin
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

//Function that authenticates and redirects to home page 
router.get('/auth/google/callback', authController.login);

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