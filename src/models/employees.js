const { DataTypes } = require('sequelize');
const db = require('../configuration/db');
const Users = require('./users');

const Employees  = db.define(
    'Employees',
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
        dni: {
            type: DataTypes.STRING(13),
            allowNull: true
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
        tableName: 'employees',
        timestamps: true
    }
);

// Relationships
Users.hasMany(Employees, { foreignKey: 'userId' });
Employees.belongsTo(Users, { foreignKey: 'userId' });

module.exports = Employees;

