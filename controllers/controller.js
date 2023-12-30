const { userInfo } = require('os');
const Giver = require('../models/model.js')

//Function for random selection 
function randomSelect(list, num){
    const shuffledNames = list.sort(() => Math.random() - 0.5);
    const RandomNames = shuffledNames.slice(0, num);
    return RandomNames
}

// Home Route 
// Takes in a no.of handles and randomly select based on the number provided 
exports.Home = async( req, res, next) => {
    const {select, handles} = req.body
    let selectedNames = randomSelect(handles, select)

    res.status(200).json({
        message:"done",
        data:selectedNames
    })
}




//exports.Handler = async (req, res, next) => {
//Get handles
//let giver = req.body
//console.log(giver)
//Store in people that contested on a certain day
//const krex = await Giver.create(req.body) 
//Check if they exist in ineligible handles
//Randomly pick required no.of handles
//Store in table for people that won for ... day
//store in table for ineligble handle
