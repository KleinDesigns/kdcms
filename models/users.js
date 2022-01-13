const Sequel = require('sequelize');
const sequel = require('../utils/database');

const User = sequel.define('user', {
    id: {
        type: Sequel.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }, 
    firstname: Sequel.STRING,
    lastname: Sequel.STRING,
    email: Sequel.STRING,
    phone: Sequel.STRING,
});

module.exports = User;