const Prescription = require('../../Models/Prescription.js');
const mongoose = require('mongoose'); //only for transaction purposes
const { DBConnection } = require('../../DataBase/db.config.js');

async function getAllPrescription() {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const prescriptions = await Prescription.find().populate('doctor')//.populate('clinic').populate('patient');
        resolve({
          success: true,
          data: prescriptions,
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
 * @param {string} prescriptionId
 * @returns {Promise}
 */
async function getPrescriptionById(prescriptionId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const prescription = await Prescription.findOne({
          _id: prescriptionId,
        }).populate('doctor').populate('clinic').populate('patient');
        resolve({
          success: true,
          data: prescription,
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
 * @param {string} doctorId
 * @param {string} clinicId
 * @param {string} patientId
 * @param {Array} medicine
 * @param {data} date
 * @param {boolean} hasPayed
 * @param {number} totalPrice
 * @param {string} paymentMethod
 * @param {boolean} tiedToDoctor
 * @returns  {Promise}
 */
async function addPrescription(
  doctorId,
  clinicId,
  patientId,
  medicine,
  date,
  hasPayed,
  totalPrice,
  paymentMethod,
  tiedToDoctor
) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const prescription = await Prescription.create({
          doctor: doctorId,
          clinic: clinicId,
          patient: patientId,
          medicine: medicine,
          date: date,
          hasPayed: hasPayed,
          totalPrice: totalPrice,
          paymentMethod: paymentMethod,
          tiedToDoctor: tiedToDoctor
        });

        //if all are ok

        resolve({
          success: true,
          data: prescription,
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
 * @param {string} prescriptionId
 * @param {string} doctorId
 * @param {string} clinicId
 * @param {string} patientId
 * @param {Array} medicine
 * @param {data} date
 * @param {boolean} hasPayed
 * @param {number} totalPrice
 * @param {string} paymentMethod
 * @param {boolean} tiedToDoctor
 * @returns {Promise}
 */
async function updatePrescription(
  prescriptionId,
  medicine,
  date,
  hasPayed,
  totalPrice,
  paymentMethod,
  tiedToDoctor
) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      const dataTracer = {};
      try {
        //the employee not allowed to edit his clinic id or any one else allowed
        const updateprescription = await Prescription.updateOne(
          {
            _id: prescriptionId,
          },
          {
            // doctor: doctorId,
            // clinic: clinicId,
            // patient: patientId,
            medicine: medicine,
            date: date,
            hasPayed: hasPayed,
            totalPrice: totalPrice,
            paymentMethod: paymentMethod,
            tiedToDoctor: tiedToDoctor
          }
        );
        const updatedPrescription = await Prescription.findOne({
          _id: prescriptionId,
        });

        //if all are ok
        dataTracer.updatedPrescriptionData = updatedPrescription;
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
 * @param {string} prescriptionId
 * @returns {Promise}
 */
async function deletePrescription(prescriptionId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      const dataTracer = {};
      try {
        const targetPrescription = await Prescription.findOne({
          _id: prescriptionId,
        });

        dataTracer.deletedPrescription = targetPrescription;

        await Prescription.deleteOne({
          _id: prescriptionId,
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
  getAllPrescription,
  getPrescriptionById,
  addPrescription,
  updatePrescription,
  deletePrescription,
};
