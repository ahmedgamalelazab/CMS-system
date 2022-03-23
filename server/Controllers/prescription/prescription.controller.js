const { request, response } = require('express');
const {
  addPrescription,
  deletePrescription,
  getAllPrescription,
  getPrescriptionById,
  updatePrescription,
} = require('../../Services/prescription/prescriptionService.js');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.getAllPrescriptionsController = async (req, res, next) => {
  try {
    const result = await getAllPrescription();

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
 */
module.exports.getPrescriptionByIdController = async (req, res, next) => {
  try {
    const prescriptionId = req.params.id;
    const result = await getPrescriptionById(prescriptionId);
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
module.exports.addPrescriptionController = async (req, res, next) => {
  try {
    const { doctorId, clinicId, patientId, medicine,
      date, hasPayed, totalPrice, paymentMethod, tiedToDoctor } = req.body;

    const result = await addPrescription(
      doctorId,
      clinicId,
      patientId,
      medicine,
      date,
      hasPayed,
      totalPrice,
      paymentMethod,
      tiedToDoctor
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
module.exports.updatePrescriptionController = async (req, res, next) => {
  try {
    const prescriptionId = req.params.id;

    const { medicine, date, hasPayed, totalPrice, paymentMethod, tiedToDoctor } = req.body;

    const result = await updatePrescription(
      prescriptionId,
      medicine,
      date,
      hasPayed,
      totalPrice,
      paymentMethod,
      tiedToDoctor
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
module.exports.removePrescriptionController = async (req, res, next) => {
  try {
    const prescriptionId = req.params.id;

    const result = await deletePrescription(prescriptionId);

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
