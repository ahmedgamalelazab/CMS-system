const Patient = require('../../Models/Patient.js');
<<<<<<< HEAD
=======
const Clinic = require('../../Models/Clinic.js');
>>>>>>> master
const mongoose = require('mongoose'); //only for transaction purposes
const { DBConnection } = require('../../DataBase/db.config.js');

async function getAllPatientsService() {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const patients = await Patient.find();
        resolve({
          success: true,
          data: patients,
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
 * @param {string} patientId
 * @returns {Promise}
 */
async function getPatientByIdService(patientId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const patient = await Patient.findOne({
          _id: patientId,
        });
        resolve({
          success: true,
          data: patient,
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
 * @param {string} firstName
 * @param {string} lastName
 * @param {number} age
 * @param {number} gender
 * @param {string} phone
 * @param {string} clinicId
 * @returns  {Promise}
 */
async function addPatientService(
  firstName,
  lastName,
  age,
  gender,
  phone,
  clinicId //this id later on will be added through out the employee search clinic data
) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const patient = await Patient.create({
          firstName: firstName,
          lastName: lastName,
          age: age,
          gender: gender,
          phone: phone,
          clinicId: clinicId,
        });

        //if all are ok

        resolve({
          success: true,
          data: patient,
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
 * @param {string} patientId
 * @param {string} firstName
 * @param {string} lastName
 * @param {number} age
 * @param {number} gender
 * @param {string} phone
 * @returns {Promise}
 */
async function updatePatientService(
  patientId,
  firstName,
  lastName,
  age,
  gender,
  phone
) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      const dataTracer = {};
      try {
        //the employee not allowed to edit his clinic id or any one else allowed
        const updatePatient = await Patient.updateOne(
          {
            _id: patientId,
          },
          {
            firstName: firstName,
            lastName: lastName,
            age: age,
            gender: gender,
            phone: phone,
          }
        );
        const updatedPatient = await Patient.findOne({
          _id: patientId,
        });

        //if all are ok
        dataTracer.updatedPatientData = updatedPatient;
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
 * @param {string} patientId
 * @returns {Promise}
 */
async function deletePatientService(patientId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      const dataTracer = {};
      try {
        const targetPatient = await Patient.findOne({
          _id: patientId,
        });

        dataTracer.deletedPatient = targetPatient;

        await Patient.deleteOne({
          _id: patientId,
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

<<<<<<< HEAD
=======
/**
 *
 * @param {string} clinicId
 * @returns {Promise}
 */
async function getAllClinicPatients(clinicId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      //if connection is ok
      try {
        const patients = await Clinic.find({
          clinic: clinicId,
        });
        //if all are ok
        resolve({
          success: true,
          data: patients,
        });
      } catch (error) {
        reject(new Error(error.message));
      }
    } else {
      reject(new Error('db connection error'));
    }
  });
}

>>>>>>> master
module.exports = {
  getAllPatientsService,
  getPatientByIdService,
  addPatientService,
  updatePatientService,
  deletePatientService,
<<<<<<< HEAD
=======
  getAllClinicPatients,
>>>>>>> master
};
