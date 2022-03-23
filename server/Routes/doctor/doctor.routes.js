const Router = require('express').Router();

const {
  addDoctorController,
  getAllDoctorPatientsData,
  getAllDoctorsController,
  removeDoctorDataController,
  updateDoctorDataController,
} = require('../../Controllers/doctor/doctor.controller.js');

//TODO implement the auth logic and pass the middleware to control those apis

Router.route('/doctors').get(getAllDoctorsController);
Router.route('/doctors/:id/patients').get(getAllDoctorPatientsData);
//weird but adding doctor here is just for admin purposes
Router.route('/doctors/add').post(addDoctorController);
//delete a doctor then update the correspond clinic
Router.route('/doctors/delete/:id').delete(removeDoctorDataController);

Router.route('/doctors/update/:id').put(updateDoctorDataController);

module.exports = Router;
