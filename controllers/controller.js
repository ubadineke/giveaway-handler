const { userInfo } = require('os');
const Giver = require('../models/model.js')

exports.Handler = async (req, res, next) => {
//Get handles
let giver = req.body
console.log(giver)
//Store in people that contested on a certain day
const krex = await Giver.create(req.body) 
//Check if they exist in ineligible handles
//Randomly pick required no.of handles
//Store in table for people that won for ... day
//store in table for ineligble handle

res.status(200).json({
    data: giver
})
};