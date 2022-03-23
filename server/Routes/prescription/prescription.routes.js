const Router = require('express').Router();

const {
  addPrescriptionController,
  getPrescriptionByIdController,
  removePrescriptionController,
  updatePrescriptionController,
  getAllPrescriptionsController,
} = require('../../Controllers/prescription/prescription.controller.js');

Router.route('/prescriptions').get(getAllPrescriptionsController);
Router.route('/prescription/:id').get(getPrescriptionByIdController);
Router.route('/prescription/add').post(addPrescriptionController);
Router.route('/prescription/remove/:id').delete(
  removePrescriptionController
);
Router.route('/prescription/update/:id').put(updatePrescriptionController);

module.exports = Router;
