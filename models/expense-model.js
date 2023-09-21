const Sequelize = require('sequelize');
const sequelize = require('../util/sequelize');

const Expense =sequelize.define('expenses', {
    amount: {type: Sequelize.INTEGER},
    description:{type: Sequelize.STRING},
    field: {type: Sequelize.STRING}
    }, 
    { timestamps: false} //disables createdat and updatedat
)

module.exports = Expense;
