const { ValidationResults } = require('express-validator');
const Clients = require('../models/clients');

exports.list = async (req, res) => {
    try {
        const clients = await Clients.findAll();
        res.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

