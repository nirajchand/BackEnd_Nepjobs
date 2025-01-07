const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('Nepjobs_Database','postgres','admin123',{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

async function testConnection(params) {
    try{
        await sequelize.authenticate();
        console.log("DB connection successfull ...... ..... ... ")
    }catch(error){
        console.log("Unable to connect to database.......................", error);
        
    }
}

testConnection()

module.exports = sequelize;