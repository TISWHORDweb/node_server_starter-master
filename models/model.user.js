/**
 * Slantapp code and properties {www.slantapp.io}
 */
/**
 * Model for user and admin
 */
const sequelize = require('./../database');
const {DataTypes, Model} = require('sequelize');
const tableName = "scriipo_users";
/**
 * Model extending sequelize model class
 */
class ModelUser extends Model {
}

ModelUser.init({
    uid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    fullname: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: true},
    country: {type: DataTypes.STRING, allowNull: true},
    balance: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 0},
    status: {type: DataTypes.BOOLEAN, defaultValue: false},
    apiKey: {type: DataTypes.STRING, allowNull: true, unique: true},
    token: {type: DataTypes.STRING, allowNull: true, unique: true},
    whoIs: {type: DataTypes.INTEGER, defaultValue: 0},
}, {sequelize, tableName});
/**
 * Run belonging and relationship before sync()
 */
sequelize.sync();
module.exports = ModelUser;