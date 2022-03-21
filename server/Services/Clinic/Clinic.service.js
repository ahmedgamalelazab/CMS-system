//Add clinic
const Clinic = require('../../Models/Clinic.js');
const { DBConnection } = require('../../DataBase/db.config.js');
const User = require('../../Models/User.js');
const { Doctor } = require('../../Models/Doctor.js');
const mongoose = require('mongoose'); //for transaction purposes

///////////////////////////////////////////////////////////////////////////
/**
 *
 * @param {string} clinicName
 * @param {string} clinicAddress
 * @param {string} clinicPhone
 * @param {string} clinicDescription
 * @param {string} userEmail
 * @param {string} userPassword
 * @param {string} docName
 * @param {number} docAge
 * @param {number} docSalary
 * @param {boolean} iswOwner
 * @param {string} docBoss
 * @returns {Promise}
 * @description calling a some transactions in order to insert record clinic
 */
async function AddClinicService(
  clinicName,
  clinicAddress,
  clinicPhone,
  clinicDescription,
  userEmail,
  userPassword,
  docName,
  docAge,
  docSalary,
  iswOwner,
  docBoss
) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      //if the DBConnection is ok
      try {
        const dataTracer = {};
        //transaction code
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
          const user = await User.create({
            email: userEmail,
            password: userPassword,
            userType: 'doctor',
          });
          //doctor profile image will set automatically with default image but then we will allow change
          //to change the doctor profile image u will click on the doctor profile image then upload profile image then u will ask th server to upload to this guy profile image
          const doctor = await Doctor.create({
            name: docName,
            age: docAge,
            salary: docSalary,
            user: user._id,
            isOwner: iswOwner,
            owner: docBoss,
          });
          const clinic = await Clinic.create({
            name: clinicName,
            address: clinicAddress,
            phone: clinicPhone,
            description: clinicDescription,
          });
          if (doctor.isOwner) {
            clinic.owner = doctor._id;
          }
          clinic.doctors.push(doctor);
          ////////////////////////////////////////
          ////////////SAVING CODE ////////////////
          //? any code issue this transaction will not fll the data
          await user.save();
          await doctor.save();
          await clinic.save();
          ////////////END OF SAVING CODE ////////////////
          ////////////////////////////////////////
          dataTracer.userData = user;
          dataTracer.doctorData = doctor;
          dataTracer.clinicData = clinic;
          //if all are ok
        });
        session.endSession(); //end transaction session
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
/////////////////////////////////////////////////////////////////////////////

/**
 * returns {Promise}
 */
async function getAllClinicsService() {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      const dataTracer = {};

      const clinics = await Clinic.find().populate('owner'); // suppose to get me all the clinics

      dataTracer.clinicsData = clinics;

      resolve({
        success: true,
        data: dataTracer.clinicsData,
      });
      //if all are ok
    } else {
      reject(new Error('db connection problem'));
    }
  });
}

module.exports = {
  AddClinicService,
  getAllClinicsService,
};
