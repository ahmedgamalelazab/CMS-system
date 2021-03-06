const { request, response } = require('express');
const {
  getAllAppointmentService,
  getClinicAppointmentsService,
  getDoctorAppointmentsService,
  getPatientAppointmentsService,
  getAppointmentByIdService,
  addAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
  getClinicAppointmentsByDateService,
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
  console.log('yes u hit the right controlleer');
  try {
    if (req.payload.userType === 'admin' || req.payload.userType === 'employee' || req.payload.userType === 'doctor') {
      if (req.payload.userType === 'admin') {
        const clinicId = req.params.id; //from clinic admin ui
        const result = await getClinicAppointmentsService(clinicId);
        //if all are ok
        res.status(200).json({
          success: true,
          data: result.data,
        });
      } else if (req.payload.userType === 'employee') {
        console.log("yeah yeah iam employee ");
        const result = await getClinicAppointmentsService(req.payload.userLoad.employeeData.clinic);
        //if all are ok
        res.status(200).json({
          success: true,
          data: result.data,
        });
      } else if (req.payload.userType === 'doctor') {
        //implementation left for doctor team 
      }
    } else {
      res.status(403).json({
        success: false,
        data: null,
        errorMessage: 'FORBIDDEN'
      })
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      errorMessage: error.message
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
 module.exports.getClinicAppointmentsByDateController = async (req, res, next) => {
  try {
    if(req.payload.userType === 'employee'){
      const date = req.params.date;
      const clinicId = req.payload.userLoad.employeeData.clinic;
      const result = await getClinicAppointmentsByDateService(clinicId,date);
      //if all are ok
      res.status(200).json({
        success: true,
        data: result.data,
      });
    }
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
    const result = await getDoctorAppointmentsService(doctorId);
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

    if (req.payload.userType === 'admin' || req.payload.userType === 'employee') {
      //FIX
      //req.payload.userType && req.payload.userLoad
      //what userLoad carries ? userLoad.employeeData.clinic => clinic's id for this employee
      //userLoad.employeeData._id 
      //userLoad.clinicData.owner ="clinic owner"
      const {
        //from the payload 
        //from the payload from clinic data
        doctorId, //from the clinic UI
        patientId, // from the params from the ui clinic 
        date,
        isConfirmed,
        totalPrice,
        payment,
      } = req.body;

      const result = await addAppointmentService(
        req.payload.userLoad.employeeData.clinic, // req.payload.userLoad.clinicData._id
        doctorId,
        patientId,
        date,
        isConfirmed,
        totalPrice,
        payment
      );

      console.log(req.payload.userLoad.employeeData.clinic);
      //if all are ok

      res.status(201).json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(403).json({
        success: false,
        data: null,
        errMessage: 'FORBIDDEN'
      })
    }


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
