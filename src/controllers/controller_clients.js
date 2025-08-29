const { validationResult } = require('express-validator');
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

exports.create = async (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        console.log(validation.errors);
        return res.status(400).json(validation.errors);
    } 
    else {
        try {
            const newClient = await Clients.create(req.body);
            res.status(201).json(newClient);
        } catch (error) {
            console.error('Error creating client:', error);
            res.status(500).json({ error: 'Internal server error' });
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
        const updated = await Clients.update( {...req.body}, {
            where: { id }
        });
        if (updated) {
            const updatedClient = await Clients.findOne({ where: { id } });
            return res.status(200).json(updatedClient);
        }
        throw new Error('Client not found');
        } catch (error) {
            console.error('Error updating client:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

exports.delete = async (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        console.log(validation.errors);
        return res.status(400).json(validation.errors);
    }
    else {
        try {
            const { id } = req.query;
            const deleted = await Clients.destroy({
                where: { id }
            });
            if (deleted) {
                return res.status(204).json("The client has been deleted");
            }
            throw new Error('Client not found');
        } catch (error) {
            console.error('Error deleting client:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};