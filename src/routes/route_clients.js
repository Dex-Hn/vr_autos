const express = require('express');
const ControllerClients = require('../controllers/controller_clients');
const { body, query } = require('express-validator');
const Clients = require('../models/clients');
const router = express.Router();

router.get('/list', ControllerClients.list);

module.exports = router;