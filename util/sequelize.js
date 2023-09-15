const Sequelize = require('sequelize'); 

const sequelize = new Sequelize('expense-tracker', 'root', 'arvind', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
})

//testing the connection 
async function testConnection(){
try{
    await sequelize.authenticate();
    console.log('Database Connected');
} catch(err){
    console.error('Unable to connect to the database');
}
}

testConnection();

module.exports = sequelize;