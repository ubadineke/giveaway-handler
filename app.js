const express = require('express')
const session = require('express-session');
const passport = require('passport');
const router = require('./routes/routes.js')
const authRoutes = require('./routes/authRoutes.js')

const app = express();


const passportConfig = require('./config/oauth')
app.use(express.json());

app.use(session({
<<<<<<< HEAD
    secret: 'sereqsd',
=======
    secret: process.env.SESSION_SECRET,
>>>>>>> 10e8d954fe55a38734038596b8054edd452ebc35
    resave: false,
    saveUninitialized: false,
  }));

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.use('/giveaway', router)
app.use('/', authRoutes)


module.exports = app;