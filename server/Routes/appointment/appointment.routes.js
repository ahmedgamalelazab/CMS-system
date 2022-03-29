const Router = require('express').Router();

const {
  getAllAppointmentController,
  getClinicAppointmentsController,
  getDoctorAppointmentsController,
  getPatientAppointmentsController,
  getAppointmentByIdController,
  AddAppointmentController,
  UpdateAppointmentController,
  RemoveAppointmentController,
  getClinicAppointmentsByDateController,
} = require('../../Controllers/appointment/appointment.controller');


//activating authentication and authorization 
const { authMiddleWare } = require('../../Middlewares/auth.js');

/**
 * @allowed : ADMIN  ONLY
 */
Router.route('/appointment').get(authMiddleWare, getAllAppointmentController); //FIX
/**
 * @allowed ADMIN ONLY  
 */
Router.route('/appointment/:id').get(authMiddleWare, getAppointmentByIdController);
/**
 * @ALLOWED ADMIN , DOCTOR  , EMPLOYEE USING THEIR TOKENS
 */
Router.route('/appointment/clinic/doctors').get(authMiddleWare, getClinicAppointmentsController);
/**
 * ADMIN , DOCTOR , EMPLOYEE , LET THE DOCTOR GET HIS OWN APPOINTMENTS
 */
Router.route('/appointment/doctor/:id').get(authMiddleWare, getDoctorAppointmentsController);
/**
 * @ALLOWED ADMIN AND EMPLOYEE
 */
Router.route('/appointment/patient/:id').get(authMiddleWare, getPatientAppointmentsController);
/**
 * @ALLOWED EMPLOYEE , ADMIN
 */
Router.route('/appointment/add').post(authMiddleWare, AddAppointmentController);
/**
 * @ALLOWED ADMIN , EMPLOYEE
 */
Router.route('/appointment/remove/:id').delete(authMiddleWare, RemoveAppointmentController);
/**
 * @ALLOWED ADMIN , EMPLOYEE 
 */
Router.route('/appointment/update/:id').put(authMiddleWare, UpdateAppointmentController);
/**
 * @ALLOWED EMPLOYEE
 */
Router.route('/appointment/date/:date').get(authMiddleWare,getClinicAppointmentsByDateController);

module.exports = Router;
