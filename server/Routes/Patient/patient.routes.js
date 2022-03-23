const Router = require('express').Router();

const {
  doctorAddPatientController,
  getPatientByIdController,
  doctorRemovePatientController,
  doctorUpdatePatientController,
  getAllPatientsController,
<<<<<<< HEAD
} = require('../../Controllers/patient/patient.controller.js');

Router.route('/patients').get(getAllPatientsController);
=======
  getAllClinicPatientsController,
} = require('../../Controllers/patient/patient.controller.js');

Router.route('/patients').get(getAllPatientsController);
Router.route('/patients/clinic/:id').get(getAllClinicPatientsController);
>>>>>>> master
Router.route('/patients/:id').get(getPatientByIdController);
Router.route('/doctor/patients/add').post(doctorAddPatientController);
Router.route('/doctor/patients/remove/:id').delete(
  doctorRemovePatientController
);
Router.route('/doctor/patients/update/:id').put(doctorUpdatePatientController);

module.exports = Router;
