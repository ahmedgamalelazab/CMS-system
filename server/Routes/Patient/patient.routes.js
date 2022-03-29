const Router = require('express').Router();

const {
  doctorAddPatientController,
  getPatientByIdController,
  doctorRemovePatientController,
  doctorUpdatePatientController,
  getAllPatientsController,
  getAllClinicPatientsController,
} = require('../../Controllers/patient/patient.controller.js');

/// Mostafa
const { authMiddleWare } = require('../../Middlewares/auth.js');

Router.route('/patients').get(getAllPatientsController);
Router.route('/patients/clinic/:id').get(authMiddleWare, getAllClinicPatientsController);
Router.route('/patients/:id').get(authMiddleWare, getPatientByIdController);
Router.route('/doctor/patients/add').post(authMiddleWare, doctorAddPatientController);
Router.route('/doctor/patients/remove/:id').delete(authMiddleWare, doctorRemovePatientController);
Router.route('/doctor/patients/update/:id').put(authMiddleWare, doctorUpdatePatientController);

module.exports = Router;
