const Router = require('express').Router();

const {
    getAllMedicinesController,
    getMedicineByIdController,
    addMedicineController,
    updateMedicineController,
    removeMedicineController,
} = require('../../Controllers/medicine/medicine.controller');

Router.route('/medicines').get(getAllMedicinesController);
Router.route('/medicine/:id').get(getMedicineByIdController);
Router.route('/medicine/add').post(addMedicineController);
Router.route('/medicine/remove/:id').delete(
    removeMedicineController
);
Router.route('/medicine/update/:id').put(updateMedicineController);

module.exports = Router;
