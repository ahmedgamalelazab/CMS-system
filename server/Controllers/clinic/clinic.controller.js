//building example data
//place holder data
const { request, response } = require('express');
const {
  AddClinicService,
  getAllClinicsService,
} = require('../../Services/Clinic/Clinic.service.js');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.getAllClinicsController = async function (req, res, next) {
  try {
    const result = await getAllClinicsService();

    //if the result came ok !

    res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.addClinicController = async function (req, res, next) {
  //body will send me a clinic data
  //the body will send the client form data then we will ask the service to insert the record in the db

  try {
    const {
      clinicName,
      clinicAddress,
      clinicPhone,
      clinicDescription,
      userEmail,
      userPassword,
      docName,
      docAge,
      docSalary,
      iswOwner,
      docBoss,
    } = req.body;

    const result = await AddClinicService(
      clinicName,
      clinicAddress,
      clinicPhone,
      clinicDescription,
      userEmail,
      userPassword,
      docName,
      docAge,
      docSalary,
      iswOwner,
      docBoss
    );

    //if no error

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
module.exports.removeClinicDataController = async (req, res, next) => {
  res.status(201).json({
    success: true,
    data: 'remove clinic logic result will be sent to the user',
  });
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.updateClinicDataController = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'update clinic logic will be sent to the user',
  });
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.getAllClinicsDoctorsController = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'get all clinic doctors logic result will be sent to the user',
  });
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this api for the doctor [OWNER] to assign to his clinic doctors
 */
module.exports.ownerAssignClinicDoctor = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'get all clinic doctors logic result will be sent to the user',
  });
};
