const sequelize = require('../config/db')
const { Sequelize, DataTypes, } = require('sequelize');

// Model for the Giver i.e person running the giveaway
const Giver = sequelize.define( 'Giver', {
    giverId: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },
    googleId:{
        type: DataTypes.STRING, 
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        //allowNull: false
    }
}, 
    { 
       tableName: 'Givers'
});

Giver.sync({ force: true })

//Model for Giveaway i.e the event 
const Giveaway = sequelize.define( 'Giveaway', {
    giveawayId:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT
    }
})

Giver.hasMany(Giveaway, { foreignKey: 'giverId'})
Giveaway.belongsTo(Giver, { foreignKey: 'giverId'})
Giveaway.sync()

//Model for Contender
const Contender = sequelize.define( 'Contender', {
    contenderId:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },
    handle:{
        type:DataTypes.STRING,
        allowNull: false
    },
    status:{
        type:DataTypes.ENUM('Eligible', 'Ineligible', 'Restricted'),
        allowNull:false,
        defaultValue:'Eligible'
    }
})

Giveaway.hasMany(Contender, { foreignKey: 'giveawayId'})
Contender.belongsTo(Giveaway, { foreignKey: 'giveawayId'})
Contender.sync()

//Model for Appearances/Features renamed Entries
const Entry = sequelize.define('Entry', {
    entryId:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },
    app:{
        type: DataTypes.STRING
    },
    outcome:{
        type:DataTypes.ENUM('Contested', 'Won'),
        allowNull:false,
        defaultValue:'Contested'
    }
})

Contender.hasMany(Entry, { foreignKey: 'contenderId'})
Entry.belongsTo(Contender, { foreignKey: 'contenderId'})
Entry.sync();

module.exports = Giver, Giveaway, Contender, Entry ;