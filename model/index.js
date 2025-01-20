const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config')
const ImageList = require('./file.model');
const db = config.db.development;

const sequelize = new Sequelize(db.database, db.username, db.password, db)
const Book = ImageList( sequelize, DataTypes );

module.exports = {
    Book,
    sequelize
}    