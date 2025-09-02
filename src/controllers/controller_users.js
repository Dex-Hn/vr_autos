const { validationResult } = require('express-validator');
const argon2 = require('argon2');
const Users = require("../models/users");
const Employees = require('../models/employees');

exports.list = async (req, res) => {
    try {
        const list = await Employees.findAll({
            include: [{
                model: Users,
            }]
        });
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.create = async (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        console.log(validation.errors);
        return res.status(400).json(validation.errors);
    }
    else {
        try {
            const { users } = req.body;
            const hash = await argon2.hash(users.password);
            const usersData = {
                username: users.username,
                email: users.email,
                password: hash
            }
            const newUsers = await Users.create({...usersData});
            const newEmployee = await Employees.create({...req.body, userId: newUsers.id});
            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: error.message });
        }
    }
};

exports.update = async (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        console.log(validation.errors);
        return res.status(400).json(validation.errors);
    }
    else {
        try {
            const { id } = req.query;
            const update = await Employees.update({ ...req.body }, { where: { id } });
            res.json({ message: "Employee updated successfully" });
        } catch (error) {
            console.error("Error updating employee:", error);
            res.status(500).json({ message: error.message });
        }
    }
}

exports.delete = async (req, res) => {
    const { id } = req.query;
    try {
        const employee = await Employees.findOne({where: { id }})
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        
        const usersDeleted = await Users.destroy({ where: { id: employee.userId}});
        const employeeDeleted = await Employees.destroy({
            where: { id }
        });
        if (employeeDeleted && usersDeleted) {
            return res.status(204).json({ message: "Employee and User deleted" });
        }
        throw new Error("Employee not found");
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.error = async (req, res) => {
    res.json({msj: 'Error en la autenticación'});
}