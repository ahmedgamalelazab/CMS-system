const Router = require('express').Router();

const { authController } = require('../../Controllers/auth/auth.controller.js');

Router.route('/auth/login').post(authController);

module.exports = Router;
