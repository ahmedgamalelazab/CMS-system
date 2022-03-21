//building example data
//place holder data
const { request, response } = require('express');
const {
  AddClinicService,
  getAllClinicsService,
  eraseClinicData,
  updateClinicDataService,
  getAllClinicDoctors,
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
      iswOwner,
      assignedBy,
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
      iswOwner,
      assignedBy
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
  try {
    const clinicId = req.params.id;
    const result = await eraseClinicData(clinicId);
    res.status(201).json({
      status: true,
      data: result.data,
      deletingState: result.deletingState,
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
module.exports.updateClinicDataController = async (req, res, next) => {
  try {
    const clinicId = req.params.id;
    const { clinicName, clinicAddress, clinicPhone, clinicDescription, owner } =
      req.body;
    const result = await updateClinicDataService(
      clinicId,
      clinicName,
      clinicAddress,
      clinicPhone,
      clinicDescription,
      owner
    );

    //if all are ok
    res.status(201).json({
      success: true,
      data: result.data,
      updateState: result.updateState,
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
module.exports.getAllClinicsDoctorsController = async (req, res, next) => {
  try {
    const clinicId = req.params.id;

    const result = await getAllClinicDoctors(clinicId);

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
 * @description this api for the doctor [OWNER] to assign to his clinic doctors
 */
module.exports.ownerAssignClinicDoctor = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'get all clinic doctors logic result will be sent to the user',
  });
};
