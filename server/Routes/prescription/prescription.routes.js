const Router = require('express').Router();

const {
  addPrescriptionController,
  getPrescriptionByIdController,
  removePrescriptionController,
  updatePrescriptionController,
  getAllPrescriptionsController,
  getPrescriptionByClinicIdController,    /// Mostafa
  getPendingPrescriptionByClinicIdController,   /// Mostafa
} = require('../../Controllers/prescription/prescription.controller.js');
const { authMiddleWare } = require('../../Middlewares/auth.js');

Router.route('/prescriptions').get(authMiddleWare,getAllPrescriptionsController);
Router.route('/prescription/:id').get(authMiddleWare,getPrescriptionByIdController);
Router.route('/prescriptions/clinic').get(authMiddleWare,getPrescriptionByClinicIdController);
Router.route('/prescriptions/clinic/pending').get(authMiddleWare,getPendingPrescriptionByClinicIdController);
Router.route('/prescription/add').post(authMiddleWare,addPrescriptionController);
Router.route('/prescription/remove/:id').delete(
  removePrescriptionController
);
Router.route('/prescription/update/:id').put(authMiddleWare,updatePrescriptionController);

module.exports = Router;
