const express = require('express')
const passport = require('passport');

const router = express.Router();


//Entry 
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

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