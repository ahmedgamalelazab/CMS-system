const { request, response } = require('express');
const {
  getAllAppointmentService,
  getClinicAppointmentsService,
  getDoctorAppointmentsService,
  getPatientAppointmentsService,
  getAppointmentByIdService,
  addAppointmentService,
  updateAppointmentService,
  deleteAppointmentService
} = require('../../Services/appointment/appointment.service.js');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description api to get all Appointment
 */
module.exports.getAllAppointmentController = async (req, res, next) => {
  try {
    const result = await getAllAppointmentService();

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
 module.exports.getClinicAppointmentsController = async (req, res, next) => {
  try {
    const clinicId = req.params.id;
    const result = await getClinicAppointmentsService(clinicId);
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
 */
 module.exports.getDoctorAppointmentsController = async (req, res, next) => {
  try {
    const doctorId = req.params.id;
    const result = await getEmployeeByIdService(doctorId);
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
 */
 module.exports.getPatientAppointmentsController = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    const result = await getPatientAppointmentsService(patientId);
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
 */
module.exports.getAppointmentByIdController = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;
    const result = await getAppointmentByIdService(appointmentId);
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
 */
module.exports.AddAppointmentController = async (req, res, next) => {
  try {
    const { clinicId, doctorId, patientId, date, isConfirmed, totalPrice, payment } = req.body;

    const result = await addAppointmentService(
      clinicId,
      doctorId,
      patientId,
      date,
      isConfirmed,
      totalPrice,
      payment
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
module.exports.UpdateAppointmentController = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;

    const { date, isConfirmed, totalPrice, payment } = req.body;

    const result = await updateAppointmentService(
      appointmentId,
      date,
      isConfirmed,
      totalPrice,
      payment
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
module.exports.RemoveAppointmentController = async (req, res, next) => {
  try {
    const appointmentId = req.params.id;

    const result = await deleteAppointmentService(appointmentId);

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
