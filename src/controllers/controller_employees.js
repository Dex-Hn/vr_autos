const { validationResult } = require('express-validator');
const Employees = require("../models/employees");

exports.list = async (req, res) => {
    try {
        const employees = await Employees.findAll();
        res.json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Internal server error" });
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
            const newEmployee = await Employees.create(req.body);
            res.status(201).json(newEmployee);
        } catch (error) {
            console.error("Error creating employee:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

exports.update = async (req, res) => {
    const { id } = req.query;
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        console.log(validation.errors);
        return res.status(400).json(validation.errors);
    }
    try {
        const updated = await Employees.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedEmployee = await Employees.findOne({ where: { id } });
            return res.status(200).json(updatedEmployee);
        }
        throw new Error("Employee not found");
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.query;
    try {
        const deleted = await Employees.destroy({
            where: { id }
        });
        if (deleted) {
            return res.status(204).json("Employee deleted");
        }
        throw new Error("Employee not found");
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
