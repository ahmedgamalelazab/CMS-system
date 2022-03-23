const { request, response } = require('express');
const {
    getAllMedicines,
    getMedicineById,
    addMedicine,
    updateMedicine,
    deleteMedicine,
} = require('../../Services/Medicine/Medicine.service');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.getAllMedicinesController = async (req, res, next) => {
    try {
        const result = await getAllMedicines();

        //if all are ok

        res.status(200).json({
            success: true,
            data: result.data,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            data: null,
            errorMessage: error.message,
        });
    }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.getMedicineByIdController = async (req, res, next) => {
    try {
        const medicineId = req.params.id;
        const result = await getMedicineById(medicineId);
        //if all are ok
        res.status(200).json({
            success: true,
            data: result.data,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            data: null,
            errorMessage: error.message
        });
    }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.addMedicineController = async (req, res, next) => {
    try {
        const { name, price } = req.body;

        const result = await addMedicine(
            name,
            price
        );

        //if all are ok

        res.status(201).json({
            success: true,
            data: result.data,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            data: null,
            errorMessage: error.message,
        });
    }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.updateMedicineController = async (req, res, next) => {
    try {
        const medicineId = req.params.id;

        const { name, price } = req.body;

        const result = await updateMedicine(
            medicineId,
            name,
            price
        );
        //if all are ok
        res.status(201).json({
            success: true,
            data: result.data,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            data: null,
            errorMessage: error.message,
        });
    }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.removeMedicineController = async (req, res, next) => {
    try {
        const medicineId = req.params.id;

        const result = await deleteMedicine(medicineId);

        //if all are ok

        res.status(201).json({
            success: true,
            data: result.data,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            data: null,
            errorMessage: error.message,
        });
    }
};
