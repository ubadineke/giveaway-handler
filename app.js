const express = require('express')
const router = require('./routes/routes.js')
const app = express();

app.use(express.json());
app.use('/giveaway', router)
module.exports = app;