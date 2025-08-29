const { DataTypes } = require('sequelize');
const db = require('../configuration/db');

const Clients  = db.define(
    'Clients',
    {
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        secondName: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        slastName: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        licenseNumber: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('M', 'F'),
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        direction: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false
        },
    },
    {
        tableName: 'clients',
        timestamps: true
    }
);

module.exports = Clients;
