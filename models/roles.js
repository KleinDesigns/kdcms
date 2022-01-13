const Sequel = require('sequelize');
const sequel = require('../utils/database');
const User = require('./users');
const Rule = require('./rules');

const Role = sequel.define('role', {
    id: {
        type: Sequel.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }, 
    title: Sequel.STRING,
});

User.belongsTo(Role, {constraints: true});
Role.hasMany(Rule);

module.exports = Role;  