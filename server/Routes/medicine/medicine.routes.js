const Router = require('express').Router();

const {
    getAllMedicinesController,
    getMedicineByIdController,
    addMedicineController,
    updateMedicineController,
    removeMedicineController,
} = require('../../Controllers/medicine/medicine.controller');

/// Mostafa

const { authMiddleWare } = require('../../Middlewares/auth');

Router.route('/medicines').get(authMiddleWare,getAllMedicinesController);
Router.route('/medicine/:id').get(authMiddleWare,getMedicineByIdController);
Router.route('/medicine/add').post(authMiddleWare,addMedicineController);
Router.route('/medicine/remove/:id').delete(authMiddleWare,
    removeMedicineController
);
Router.route('/medicine/update/:id').put(authMiddleWare,updateMedicineController);

module.exports = Router;
