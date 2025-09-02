const express = require('express'); 
const ControllerUsers = require('../controllers/controller_users');
const { body, query } = require('express-validator');
const Users = require("../models/users");
const Employees = require("../models/employees");
const router = express.Router();

router.get('/list', ControllerUsers.list);

router.put('/update',
    //Not Empty
    query('id').isInt().withMessage('ID must be an integer')
    .custom( async (value) => {
        const employees = await Employees.findOne({ where: { id: value } });
        if (!employees) {
            throw new Error('User not found');
        }
    }),
    body('firstName').isLength({ min: 3, max: 50 }).withMessage('First name must be between 3 and 50 characters')
    .notEmpty().withMessage('First name is required'),
    body('lastName').isLength({ min: 3, max: 50 }).withMessage('Last name must be between 3 and 50 characters'),
    body('status').isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),

    // Optional Empty
    body('dni').isLength({ min: 13, max: 13 }).withMessage('DNI must be 13 characters long')
    .notEmpty().withMessage('DNI is required')
    .custom( async (value) => {
        const employee = await Employees.findOne({ where: { dni: value } });
        if (employee) {
            throw new Error('DNI already exists');
        }
    }),
    body('age').optional().isInt({ min: 18 }).withMessage('Age must be at least 18'),
    body('gender').optional().isIn(['M', 'F']).withMessage('Gender must be either M or F'),
    body('phoneNumber').optional().isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 characters'),
    body('direction').optional().isLength({ min: 5, max: 100 }).withMessage('Direction must be at most 100 characters'),
    //body('username').optional().isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters'),
    //body('email').optional().isEmail().withMessage('Invalid email format'),
    //body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ControllerUsers.update
);

router.delete('/delete',
    query('id').isInt().withMessage('ID must be an integer')
    .custom( async (value) => {
        const employee = await Employees.findOne({ where: { id: value } });
        if (!employee) {
            throw new Error('Employee not found');
        }
    }),
    ControllerUsers.delete
);

router.get('/error', ControllerUsers.error);

module.exports = router;
