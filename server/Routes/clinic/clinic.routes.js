const Router = require('express').Router();

const {
  getAllClinicsController,
  addClinicController,
  getAllClinicsDoctorsController,
  removeClinicDataController,
  updateClinicDataController,
  ownerAssignClinicDoctor,
} = require('../../Controllers/clinic/clinic.controller.js');

const { authMiddleWare } = require('../../Middlewares/auth.js');

Router.route('/clinics').get(authMiddleWare, getAllClinicsController);
Router.route('/clinics/:id/doctors').get(
  authMiddleWare,
  getAllClinicsDoctorsController
);
Router.route('/clinics/add').post(authMiddleWare, addClinicController);
Router.route('/clinics/update/:id').put(
  authMiddleWare,
  updateClinicDataController
);
Router.route('/clinics/delete/:id').delete(
  authMiddleWare,
  removeClinicDataController
);

module.exports = Router;
