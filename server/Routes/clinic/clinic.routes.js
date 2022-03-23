const Router = require('express').Router();

const {
  getAllClinicsController,
  addClinicController,
  getAllClinicsDoctorsController,
  removeClinicDataController,
  updateClinicDataController,
<<<<<<< HEAD
  ownerAssignClinicDoctor,
} = require('../../Controllers/clinic/clinic.controller.js');

//TODO only who will be able to execute those in system admin only
//TODO implement the Auth logic middleware and inject it to the routes

Router.route('/clinics').get(getAllClinicsController);
Router.route('/clinics/:id/doctors').get(getAllClinicsDoctorsController);
Router.route('/clinics/add').post(addClinicController);
Router.route('/clinics/update/:id').put(updateClinicDataController);
Router.route('/clinics/delete/:id').delete(removeClinicDataController);
=======
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
>>>>>>> master

module.exports = Router;
