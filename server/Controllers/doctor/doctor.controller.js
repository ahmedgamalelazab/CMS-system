const { request, response } = require('express');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.getAllDoctorsController = async (req, res, next) => {};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description you can add doctor to the system then u can assign him to a clinic , this is only for the admin
 * @admin true only for the admin
 */
module.exports.addDoctorController = async (req, res, next) => {};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.removeDoctorDataController = async (req, res, next) => {};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.getAllDoctorPatientsData = async (req, res, next) => {};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.updateDoctorDataController = async (req, res, next) => {};
