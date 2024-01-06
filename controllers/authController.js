const passport = require('passport')

// Middleware function for Google authentication
exports.googleAuthMiddleware = passport.authenticate('google', { failureRedirect: '/login', session: false });

// Route handler function after successful authentication
exports.handleGoogleAuthCallback = (req, res) => {
  // Logic after successful authentication
  res.redirect('/');
};

