const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const app = require('./app');
const sequelize = require('./config/db')

//Test Database Connection 
const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});

