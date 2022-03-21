const { request, response } = require('express');
const {
  addDoctorToClinicService,
  getAllDoctorsService,
  removeDoctorService,
} = require('../../Services/doctor/doctor.service.js');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.getAllDoctorsController = async (req, res, next) => {
  try {
    const result = await getAllDoctorsService();
    //if all are ok
    res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      errorMessage: error.message,
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description you can add doctor to the system then u can assign him to a clinic , this is only for the admin
 * @admin true only for the admin
 */
module.exports.addDoctorController = async (req, res, next) => {
  try {
    console.log(req.body);
    const { docName, docAge, assignedBy, userEmail, userPassword } = req.body;

    const result = await addDoctorToClinicService(
      docName,
      docAge,
      assignedBy,
      userEmail,
      userPassword
    );
    //if all are ok
    res.status(201).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      errorMessage: error.message,
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.removeDoctorDataController = async (req, res, next) => {
  try {
    const docId = req.params.id;

    const result = await removeDoctorService(docId);

    //if all are ok

    res.status(201).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      errorMessage: error.message,
    });
  }
};

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
