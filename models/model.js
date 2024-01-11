const sequelize = require('../config/db')
const { Sequelize, DataTypes, } = require('sequelize');

// Model for the Giver i.e person running the giveaway
const Giver = sequelize.define( 'Giver', {
    giver_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },
    google_id:{
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

Giver.sync()

//Model for Giveaway i.e the event 
const Giveaway = sequelize.define( 'Giveaway', {
    giveaway_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type: DataTypes.TEXT
    }
})

Giver.hasMany(Giveaway, { foreignKey: 'giver_id'})
Giveaway.belongsTo(Giver, { foreignKey: 'giver_id'})
Giveaway.sync()

//Model for Instances of a certain Giveaway i.e a particular giveaway can be conducted several times
const Instance = sequelize.define('Instance', {
    instance_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    }
})

Giveaway.hasMany(Instance, {foreignKey: 'giveaway_id'})
Instance.belongsTo(Giveaway, {foreignKey: 'giveaway_id'})
Instance.sync()

//Model for Contender
const Contender = sequelize.define( 'Contender', {
    contender_id:{
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

Giveaway.hasMany(Contender, { foreignKey: 'giveaway_id'})
Contender.belongsTo(Giveaway, { foreignKey: 'giveaway_id'})
Contender.sync()

//Model for Appearances/Features renamed Entries
const Entry = sequelize.define('Entry', {
    entry_id:{
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

Contender.hasMany(Entry, { foreignKey: 'contender_id'})
Entry.belongsTo(Contender, { foreignKey: 'contender_id'})

Instance.hasMany(Entry, {foreignKey: 'instance_id'})
Entry.belongsTo(Instance, {foreignKey: 'instance_id'})
Entry.sync();

module.exports = Giver, Giveaway, Contender, Entry ;