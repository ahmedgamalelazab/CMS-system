const Router = require('express').Router();

const {
<<<<<<< HEAD
    getAllAppointmentsController,
    getAppointmentByIdController,
    addAppointmentController,
    updateAppointmentController,
    removeAppointmentController,
} = require('../../Controllers/appointment/appointment.controller');

Router.route('/appointments').get(getAllAppointmentsController);
Router.route('/appointment/:id').get(getAppointmentByIdController);
Router.route('/appointment/add').post(addAppointmentController);
Router.route('/appointment/remove/:id').delete(
    removeAppointmentController
);
Router.route('/appointment/update/:id').put(updateAppointmentController);
=======
  getAllAppointmentController,
  getClinicAppointmentsController,
  getDoctorAppointmentsController,
  getPatientAppointmentsController,
  getAppointmentByIdController,
  AddAppointmentController,
  UpdateAppointmentController,
  RemoveAppointmentController
} = require('../../Controllers/appointment/appointment.controller.js');

Router.route('/appointment').get(getAllAppointmentController);
Router.route('/appointment/:id').get(getAppointmentByIdController);
Router.route('/appointment/clinic/:id').get(getClinicAppointmentsController);
Router.route('/appointment/doctor/:id').get(getDoctorAppointmentsController);
Router.route('/appointment/patient/:id').get(getPatientAppointmentsController);
Router.route('/appointment/add').post(AddAppointmentController);
Router.route('/appointment/remove/:id').delete(
  RemoveAppointmentController
);
Router.route('/appointment/update/:id').put(UpdateAppointmentController);
>>>>>>> master

module.exports = Router;
