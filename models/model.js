const sequelize = require('../config/db')
const { Sequelize, DataTypes, Model} = require('sequelize');

// Model for the Giver i.e person running the giveaway
const Giver = sequelize.define( 'Giver', {
    giverId: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },
    fname:{
        type:DataTypes.STRING,
        allowNull: false
    },
    lname:{
        type:DataTypes.TIME,
        allowNull: false
    },
    email:{
        type:DataTypes.TIME,
        allowNull: false
    },
    password:{
        type:DataTypes.TIME,
        allowNull: false
    }
}, 
    { 
       tableName: 'Givers'
});

Giver.sync()

//Model for Giveaway
// const Giveaway = sequelize.define( 'Giveaway', {
//     giveawayId:{

//     },
//     description:{

//     }
// })

// class Contender extends Model {}

// Contender.init({
//     handle: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     app:{
//         type:DataTypes.STRING
//     },
//     time:{
//         type:DataTypes.TIME,
//     }   
// }, {
//     sequelize,
//     modelName: 'Contender',
//     tableName: 'Contenders'
// })
// Contender.sync()

module.exports = Giver;