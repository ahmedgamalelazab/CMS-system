const { Medicine } = require('../../Models/Medicine')
const mongoose = require('mongoose'); //only for transaction purposes
const { DBConnection } = require('../../DataBase/db.config.js');

async function getAllMedicines() {
    return new Promise(async (resolve, reject) => {
        if (DBConnection.isConnected()) {
            try {
                const medicines = await Medicine.find();
                resolve({
                    success: true,
                    data: medicines,
                });
            } catch (error) {
                reject(new Error(error.message));
            }
        } else {
            reject(new Error('db connection problem'));
        }
    });
}

/**
 * @param {string} name 
 * @param {string} price
 */
async function getMedicineById(medicineId) {
    return new Promise(async (resolve, reject) => {
        if (DBConnection.isConnected()) {
            try {
                const medicine = await Medicine.findOne({
                    _id: medicineId,
                });
                resolve({
                    success: true,
                    data: medicine,
                });
            } catch (error) {
                reject(new Error(error.message));
            }
        } else {
            reject(new Error('db connection problem'));
        }
    });
}
/**
 * 
 * @param {string} name 
 * @param {string} price
 * @returns  {Promise}
 * */

async function addMedicine(
    name,
    price,

) {
    return new Promise(async (resolve, reject) => {
        if (DBConnection.isConnected()) {
            try {
                const medicine = await Medicine.create({
                    name: name,
                    price: price,
                });
                //if all are ok
                resolve({
                    success: true,
                    data: medicine,
                });
            } catch (error) {
                reject(new Error(error.message));
            }
        } else {
            reject(new Error('db connection problem'));
        }
    });
}
/**
 * @param {string} name
 * @param {string} price 
 * @returns  {Promise}
 * */

async function updateMedicine(
    medicineId,
    name,
    price,
) {
    return new Promise(async (resolve, reject) => {
        if (DBConnection.isConnected()) {
            const dataTracer = {};
            try {
                //the employee not allowed to edit his clinic id or any one else allowed
                const updateMedicine = await Medicine.updateOne(
                    {
                        _id: medicineId,
                    },
                    {
                        name: name,
                        price: price,
                    }
                );
                const updatedMedicine = await Medicine.findOne({
                    _id: medicineId,
                });

                //if all are ok
                dataTracer.updatedMedicineData = updatedMedicine;
                dataTracer.updatedRecord = true;
                resolve({
                    success: true,
                    data: dataTracer,
                });
            } catch (error) {
                reject(new Error(error.message));
            }
        } else {
            reject(new Error('db connection error'));
        }
    });
}

/**
 *
 * @param {string} medicineId
 * @returns {Promise}
 */
async function deleteMedicine(medicineId) {
    return new Promise(async (resolve, reject) => {
        if (DBConnection.isConnected()) {
            const dataTracer = {};
            try {
                const targetMedicine = await Medicine.findOne({
                    _id: medicineId,
                });

                dataTracer.deletedMedicine = targetMedicine;

                await Medicine.deleteOne({
                    _id: medicineId,
                });
                resolve({
                    success: true,
                    data: dataTracer,
                });
            } catch (error) {
                reject(new Error(error.message));
            }
        } else {
            reject(new Error('db connection problem'));
        }
    });
}

module.exports = {
    getAllMedicines,
    getMedicineById,
    addMedicine,
    updateMedicine,
    deleteMedicine,
};