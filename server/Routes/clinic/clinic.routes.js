const Router = require('express').Router();

const {
  getAllClinicsController,
  addClinicController,
  getAllClinicsDoctorsController,
  removeClinicDataController,
  updateClinicDataController,
  ownerAssignClinicDoctor,
} = require('../../Controllers/clinic/clinic.controller.js');

//TODO only who will be able to execute those in system admin only
//TODO implement the Auth logic middleware and inject it to the routes

Router.route('/clinics').get(getAllClinicsController);
Router.route('/clinics/:id/doctors').get(getAllClinicsDoctorsController);
Router.route('/clinics/add').post(addClinicController);
Router.route('/clinics/update/:id').put(updateClinicDataController);
Router.route('/clinics/delete/:id').delete(removeClinicDataController);

module.exports = Router;