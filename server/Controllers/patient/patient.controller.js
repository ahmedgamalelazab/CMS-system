const { request, response } = require('express');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.getAllPatientsController = async (req, res, next) => {};
/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.doctorGetAllPatientsController = async (req, res, next) => {};
/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.doctorAddPatientController = async (req, res, next) => {};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.doctorUpdatePatientController = async (req, res, next) => {};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.doctorRemovePatientController = async (req, res, next) => {};
