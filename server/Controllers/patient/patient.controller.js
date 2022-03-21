const { request, response } = require('express');
const {
  addPatientService,
  deletePatientService,
  getAllPatientsService,
  getPatientByIdService,
  updatePatientService,
} = require('../../Services/patients/patientService.js');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.getAllPatientsController = async (req, res, next) => {
  try {
    const result = await getAllPatientsService();

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

module.exports.getPatientByIdController = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    const result = await getPatientByIdService(patientId);
    //if all are ok
    res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.doctorAddPatientController = async (req, res, next) => {
  try {
    const { firstName, lastName, age, gender, phone, clinicId } = req.body;

    const result = await addPatientService(
      firstName,
      lastName,
      age,
      gender,
      phone,
      clinicId
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
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.doctorUpdatePatientController = async (req, res, next) => {
  try {
    const patientId = req.params.id;

    const { firstName, lastName, age, gender, phone } = req.body;

    const result = await updatePatientService(
      patientId,
      firstName,
      lastName,
      age,
      gender,
      phone
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
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.doctorRemovePatientController = async (req, res, next) => {
  try {
    const patientId = req.params.id;

    const result = await deletePatientService(patientId);

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
