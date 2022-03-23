const Router = require('express').Router();

const {
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

module.exports = Router;
