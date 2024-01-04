const express = require('express')
const session = require('express-session');
const passport = require('passport');
const router = require('./routes/routes.js')
const authRoutes = require('./routes/authRoutes.js')

const app = express();


const passportConfig = require('./config/oauth')
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }));

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.use('/giveaway', router)
app.use('/', authRoutes)


module.exports = app;