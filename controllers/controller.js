const sequelize = require('../config/db');
const Giveaway = require('../models/model')


//Function for random selection 
function randomSelect(list, num){
    const shuffledNames = list.sort(() => Math.random() - 0.5);
    const RandomNames = shuffledNames.slice(0, num);
    return RandomNames;
}

// Home Route 
// Takes in a no.of handles and randomly select based on the number provided 
exports.protect = async(req, res, next) => {

}

exports.Display = async(req, res, next) => {
    res.status(200).json({
        message: 'E dey work',
        data: null
    })
}
exports.Home = async( req, res, next) => {
    const {title, select, handles} = req.body
    for (let i = 0; i < handles.length; i++){
      const result  = await sequelize.query(`INSERT INTO "Contenders" (giveaway_id, handle, "createdAt", "updatedAt") VALUES ((select giveaway_id from "Giveaways" where title = '${title}'), '${handles[i]}', '2024-01-09 12:28:35.686 +0100', '2024-01-09 12:28:35.686 +0100')`)  
    };
    
    let selectedNames = randomSelect(handles, select)

    res.status(200).json({
        message:"done",
        data:selectedNames
    })
}

exports.createEvent = async (req, res, next) => {
try{
 const {title, description} = req.body
const [results, metadata] = await sequelize.query(`INSERT INTO "Giveaways" (giver_id, title, description, "createdAt", "updatedAt") VALUES  ((select giver_id  from "Givers" where name = '${req.user.name}'), '${title}', '${description}', '2024-01-09 12:28:35.686 +0100', '2024-01-09 12:28:35.686 +0100')`)

res.status(200).json({
    message: "Giveaway successfully created",
    data: `${metadata} row successfully modified`
 })
}catch(err){
    res.status(401).json({message: err})
}

}

exports.getEvent = async (req, res, next) => {
    console.log(req.user)
//Extract id from the req.user, check the Giveaway table for events related to that user and return them
const [events] = await sequelize.query(`SELECT title, description FROM "Giveaways" WHERE giver_id = ${req.user.giver_id}`) 
res.status(200).json({
    message:"Successfully retrieved",
    data:events
})
}

exports.addEntry = async (req, res, next ) => {
    const {eventName} = req.params
    console.log(eventName)
}

exports.getContender = async (req, res, next) => {

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
