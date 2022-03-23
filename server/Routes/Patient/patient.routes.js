const Router = require('express').Router();

const {
  doctorAddPatientController,
  getPatientByIdController,
  doctorRemovePatientController,
  doctorUpdatePatientController,
  getAllPatientsController,
} = require('../../Controllers/patient/patient.controller.js');

Router.route('/patients').get(getAllPatientsController);
Router.route('/patients/:id').get(getPatientByIdController);
Router.route('/doctor/patients/add').post(doctorAddPatientController);
Router.route('/doctor/patients/remove/:id').delete(
  doctorRemovePatientController
);
Router.route('/doctor/patients/update/:id').put(doctorUpdatePatientController);

module.exports = Router;
