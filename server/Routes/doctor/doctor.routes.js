const Router = require('express').Router();

const {
  addDoctorController,
  getAllDoctorPatientsData,
  getAllDoctorsController,
  removeDoctorDataController,
  updateDoctorDataController,
  getDoctorByIdController,
} = require('../../Controllers/doctor/doctor.controller.js');

//TODO implement the auth logic and pass the middleware to control those apis
//TODO PROTECT THOSE ROUTES
const { authMiddleWare } = require('../../Middlewares/auth.js');

/**
 * @description : this will get all doctors on the system
 */
//  Router.route('/doctors').get(authMiddleWare, getAllDoctorsController);
Router.route('/doctors').get(authMiddleWare,getAllDoctorsController);
Router.route('/doctors/:id').get(authMiddleWare,getDoctorByIdController);
Router.route('/doctors/all/patients').get(authMiddleWare,getAllDoctorPatientsData);
//weird but adding doctor here is just for admin purposes
Router.route('/doctors/add').post(authMiddleWare,addDoctorController);
//delete a doctor then update the correspond clinic
Router.route('/doctors/delete/:id').delete(authMiddleWare,removeDoctorDataController);

Router.route('/doctors/update/:id').put(authMiddleWare,updateDoctorDataController);

module.exports = Router;
