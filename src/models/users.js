const { DataTypes } = require('sequelize');
const db = require('../configuration/db');

const Users = db.define(
    'Users',
    {
        username: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        pin: {
            type: DataTypes.STRING(5),
            allowNull: true,
            defaultValue: '00000'
        },
        tryCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'banned'),
            allowNull: false,
            defaultValue: 'active'
        }
    },
    {
        tableName: 'users',
        timestamps: true
    }
);

module.exports = Users;