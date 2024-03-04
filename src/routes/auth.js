const express = require('express');
const route = express.Router();
const authController = require('../controllers/auth');

route.post(`/login`, authController.login)

module.exports = route