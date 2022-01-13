const Sequel = require('sequelize');
const sequel = require('../utils/database');

const Rule = sequel.define('rule', {
    id: {
        type: Sequel.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }, 
    title: Sequel.STRING,
});

module.exports = Rule;