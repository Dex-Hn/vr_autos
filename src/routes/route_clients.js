const express = require('express');
const ControllerClients = require('../controllers/controller_clients');
const { body, query } = require('express-validator');
const Clients = require('../models/clients');
const router = express.Router();

router.get('/list', ControllerClients.list);
router.post('/create',
    // Not Empty
    body('firstName').isLength({ min: 3, max: 50 }).withMessage('First name must be between 3 and 50 characters')
    .notEmpty().withMessage('First name is required'),
    body('lastName').isLength({ min: 3, max: 50 }).withMessage('Last name must be between 3 and 50 characters'),
    body('licenseNumber').isLength({ min: 15, max: 15 }).withMessage('License number must be 15 characters long')
    .notEmpty().withMessage('License number is required')
    .custom( async (value) => {
        const client = await Clients.findOne({ where: { licenseNumber: value } });
        if (client) {
            throw new Error('License number already exists');
        }
    }),
    body('status').isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),

    // Optional Empty
    body('age').optional().isInt({ min: 18 }).withMessage('Age must be at least 18'),
    body('gender').optional().isIn(['M', 'F']).withMessage('Gender must be either M or F'),
    body('phoneNumber').optional().isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 characters'),
    body('direction').optional().isLength({ min: 5, max: 100 }).withMessage('Direction must be at most 100 characters'),
    ControllerClients.create
);

router.put('/update',
    // Not Empty
    body('firstName').isLength({ min: 3, max: 50}).withMessage('First name must be between 3 and 50 characters')
    .notEmpty().withMessage('First name is required'),
    body('lastName').optional().isLength({ min: 3, max: 50}).withMessage('Last name must be between 3 and 50 characters'),
    body('licenseNumber').isLength({ min: 15, max: 15}).withMessage('License number must be 15 characters long')
    .notEmpty().withMessage('License number is required'),
    body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),

    // Optional Empty
    body('age').optional().isInt({ min: 18 }).withMessage('Age must be at least 18'),
    body('gender').optional().isIn(['M', 'F']).withMessage('Gender must be either M or F'),
    body('phoneNumber').optional().isLength({ min: 10, max: 15 }).withMessage('Phone number must be between 10 and 15 characters'),
    body('direction').optional().isLength({ min: 5, max: 100 }).withMessage('Direction must be at most 100 characters'),
    ControllerClients.update
);

router.delete('/delete',
    query('id').isInt().withMessage('ID must be an integer')
    .custom( async (value) => {
        const client = await Clients.findOne({ where: { id: value } });
        if (!client) {
            throw new Error('Client not found');
        }
    }),
    ControllerClients.delete
);

module.exports = router;