const Sequel = require('sequelize');

const sequel = new Sequel('kdcms', 'root', 'root', {
    dialect: 'mysql', 
    host:'localhost',
});

module.exports = sequel;