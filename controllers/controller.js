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

exports.Display = async(req, res, next) => {
    res.status(200).json({
        message: 'E dey work',
        data: null
    })
}
exports.Home = async( req, res, next) => {
    const {title, select, handles} = req.body
//Save new/non-existing contenders to the db

    // --- Extract existing contenders in the db 
    const [existingVal] = await sequelize.query(`SELECT handle from "Contenders" c JOIN "Giveaways" g on c.giveaway_id = g.giveaway_id WHERE g.title = '${title}'`)

    let names = []; //store contenders in array format
    for(let i = 0; i < existingVal.length; i++) {
        names.push(existingVal[i].handle);
    }

    //---Filter out values present in handles but not in names and save to db
    const complement = handles.filter(value => !names.includes(value));
    if(complement.length !== 0){
        for (let i = 0; i < handles.length; i++){
            const result  = await sequelize.query(`INSERT INTO "Contenders" (giveaway_id, handle, "createdAt", "updatedAt") VALUES ((select giveaway_id from "Giveaways" where title = '${title}'), '${handles[i]}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`)  
            }
    }

//Save all handles(new or existing) to entries table 
for(let i = 0; i < handles.length; i++){
    const entries = await sequelize.query(`INSERT INTO "Entries" (contender_id, "createdAt", "updatedAt") VALUES ((SELECT contender_id FROM "Contenders" c JOIN "Giveaways" g ON c.giveaway_id = g.giveaway_id WHERE handle = '${handles[i]}' AND title = '${title}'), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`)
}

    let selectedNames = randomSelect(handles, select)

    res.status(200).json({
        message:"done",
        data:{
            new_input:complement,
            selected:selectedNames
        }
    })
}

exports.createEvent = async (req, res, next) => {
try{
 const {title, description} = req.body
const [results, metadata] = await sequelize.query(`INSERT INTO "Giveaways" (giver_id, title, description, "createdAt", "updatedAt") VALUES  ((select giver_id  from "Givers" where name = '${req.user.name}'), '${title}', '${description}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`)


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
