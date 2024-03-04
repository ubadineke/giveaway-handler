const db = require('../config/db');
const Giveaway = require('../models/model');
const { Sequelize } = require('sequelize');
//Function for random selection
function randomSelect(list, num) {
	const shuffledNames = list.sort(() => Math.random() - 0.5);
	const RandomNames = shuffledNames.slice(0, num);
	return RandomNames;
}

// Home Route
// Takes in a no.of handles and randomly select based on the number provided

exports.Display = async (req, res, next) => {
	res.status(200).json({
		message: 'E dey work',
	});
};

exports.Home = async (req, res, next) => {
	try {
		const { title, select, handles } = req.body;
		//Save new/non-existing contenders to the db

		//Check if Giveaway exists in the db
		const giveaway = await db.query(`SELECT title from "Giveaways" WHERE title = ?`, {
			replacements: [title],
			type: Sequelize.QueryTypes.SELECT,
		});
		if (giveaway.length == 0)
			return res.status(404).json({
				Error: 'Giveaway not found, Create one and try again! ',
			});
		// --- Extract existing contenders in the db
		const existingVal = await db.query(
			`SELECT handle from "Contenders" c JOIN "Giveaways" g on c.giveaway_id = g.giveaway_id WHERE g.title = ?`,
			{
				replacements: [title],
				type: Sequelize.QueryTypes.SELECT,
			}
		);
		console.log(existingVal);
		let names = []; //store contenders in array format
		// let complement = [];
		//Execute only when values/handles exist already in the database
		if (existingVal.length > 0) {
			for (let i = 0; i < existingVal.length; i++) {
				names.push(existingVal[i].handle);
			}
		}
		//---Filter values present in handles but not in names and save to db
		const complement = handles.filter((value) => !names.includes(value));
		if (complement.length !== 0) {
			for (let i = 0; i < complement.length; i++) {
				const result = await db.query(
					`INSERT INTO "Contenders" (giveaway_id, handle, "createdAt", "updatedAt") VALUES ((select giveaway_id from "Giveaways" where title = ?), ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
					{
						replacements: [title, complement[i]],
						type: Sequelize.QueryTypes.SELECT,
					}
				);
			}
		}

		//Create an instance of the current giveaway
		const [instances, metadata] = await db.query(
			`INSERT INTO "Instances" (giveaway_id, "createdAt", "updatedAt") VALUES  ((SELECT giveaway_id  FROM "Giveaways" where title = ?), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING instance_id`,
			{
				replacements: [title],
				type: Sequelize.QueryTypes.SELECT,
			}
		);

		//Save all handles(new or existing) to entries table
		for (let i = 0; i < handles.length; i++) {
			const entries = await db.query(
				`INSERT INTO "Entries" (contender_id, instance_id, "createdAt", "updatedAt") VALUES ((SELECT contender_id FROM "Contenders" c JOIN "Giveaways" g ON c.giveaway_id = g.giveaway_id WHERE handle = ? AND title = ? LIMIT 1), ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
				{
					replacements: [handles[i], title, instances.instance_id],
					type: Sequelize.QueryTypes.SELECT,
				}
			);
		}

		let selectedNames = randomSelect(handles, select); //select randomly
		//Update the outcome of the contender's entry after the random selection
		for (let i = 0; i < selectedNames.length; i++) {
			console.log(i);
			await db.query(
				`UPDATE "Entries" SET outcome = 'Won' WHERE instance_id = ? AND contender_id = (SELECT contender_id FROM "Contenders" WHERE handle = ?)`,
				{
					replacements: [instances.instance_id, selectedNames[i]],
					type: Sequelize.QueryTypes.SELECT,
				}
			);
		}
		//

		//Function to add next - if one fails, revert the other stuff saved to the db

		res.status(200).json({
			message: 'done',
			new_input: complement,
			selected: selectedNames,
		});
	} catch (err) {
		res.status(400).json({ Error: 'Unsuccessful, try again!' });
	}
};
//Create a new giveaway
exports.createEvent = async (req, res, next) => {
	try {
		const { title, description } = req.body;
		if (!title || !description) return res.status(400).json('Provide necessary details');
		const [results, metadata] = await db.query(
			`INSERT INTO "Giveaways" (giver_id, title, description, "createdAt", "updatedAt") VALUES  ((select giver_id  from "Givers" where name = ?), ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
			{
				replacements: [req.user.name, title, description],
				type: Sequelize.QueryTypes.SELECT,
			}
		);
		res.status(200).json({
			message: 'Giveaway successfully created',
		});
	} catch (err) {
		res.status(401).json({ message: err });
	}
};

exports.getEvent = async (req, res, next) => {
	//Extract id from the req.user, check the Giveaway table for events related to that user and return them
	const [events] = await db.query(
		`SELECT title, description FROM "Giveaways" WHERE giver_id = ?`,
		{
			replacements: [req.user.giver_id],
			type: Sequelize.QueryTypes.SELECT,
		}
	);
	if (!events) {
		return res.status(404).json("You don't have any events ");
	}
	res.status(200).json({
		message: 'Successfully retrieved',
		data: events,
	});
};

exports.addEntry = async (req, res, next) => {
	const { eventName } = req.params;
	console.log(eventName);
};

exports.createEventInstance = async (req, res, next) => {
	// try{

	res.status(200).json({
		message: 'Giveaway Instance successfully created',
	});
	//         }catch(err){
	//             res.status(401).json({message: err})
	//         }
};

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
