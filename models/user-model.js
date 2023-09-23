const Sequelize = require('sequelize');
const sequelize = require('../util/sequelize');

const User =sequelize.define('users', {
    name: {type: Sequelize.STRING},
    email:{type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    //ispremiumuser: {type: sequelize.BOOLEAN}

    }, 
    { timestamps: false} //disables createdat and updatedat
)

module.exports = User;
