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
 * @param {boolean} iswOwner
 * @param {string} assignedBy
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
  iswOwner,
  assignedBy
) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      //if the DBConnection is ok
      const session = await mongoose.startSession();
      try {
        const dataTracer = {};
        //transaction code
        await session.withTransaction(async () => {
          const user = await User.create(
            [
              {
                email: userEmail,
                password: userPassword,
                userType: 'doctor',
              },
            ],
            {
              session: session,
            }
          );
          //doctor profile image will set automatically with default image but then we will allow change
          //to change the doctor profile image u will click on the doctor profile image then upload profile image then u will ask th server to upload to this guy profile image
          const doctor = await Doctor.create(
            [
              {
                name: docName,
                age: docAge,
                user: user[0]._id,
                isOwner: iswOwner,
                assignedBy: assignedBy,
              },
            ],
            {
              session: session,
            }
          );
          //test transactions : note : took me hours to understand this transaction system
          //i've read almost all the documentation in order to get it 😂
          // throw 'transaction test mongodb';
          const clinic = await Clinic.create(
            [
              {
                name: clinicName,
                address: clinicAddress,
                phone: clinicPhone,
                description: clinicDescription,
              },
            ],
            {
              session: session,
            }
          );
          if (doctor[0].isOwner) {
            console.log('yes');
            clinic[0].owner = doctor[0]._id;
          }
          doctor[0].isConnectedToClinic = true;
          console.log(clinic[0]);
          console.log(clinic[0].doctors);
          console.log(doctor[0]._id);
          clinic[0].doctors.push(doctor[0]._id);
          ////////////////////////////////////////
          ////////////SAVING CODE ////////////////
          //? any code issue this transaction will not fll the data
          await user[0].save();
          await doctor[0].save();
          await clinic[0].save();
          ////////////END OF SAVING CODE ////////////////
          ////////////////////////////////////////
          dataTracer.userData = user;
          dataTracer.doctorData = doctor;
          dataTracer.clinicData = clinic;
          //if all are ok
          // throw 'test'; //transaction worked
        });
        await session.endSession(); //end transaction session
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
 * @very_important : BUG FIXED getting array of doctors using populate rather than depend on nested object
 * returns {Promise}
 */
async function getAllClinicsService() {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      const dataTracer = {};

      const clinics = await Clinic.find().populate('owner').populate('doctors'); // suppose to get me all the clinics

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

/**
 * @idea : to delete clinic u have either delete the whole clinic data with doctor data or simply delete the clinic and keep the data of the doctor then switch to the doctor as admin and delete his data if u want
 * @desc : so we won't delete the whole data we simply will delete the clinic
 * @very_important : the strategy of the erasing is simply allow the admin to know if the doctor is connected to clinic or not if the doctor tagged with isConnectedToClinic : false that's mean we should erase his data on demand
 * @param {string} clinicId
 * @returns {Promise}
 */
async function eraseClinicData(clinicId) {
  return new Promise(async (resolve, reject) => {
    const dataTracer = {}; //data tracer

    if (DBConnection.isConnected()) {
      try {
        //do connection safe

        //we will do some transactions in order to delete and mark down the doctors who are connected to the clinic removed

        const session = await mongoose.startSession();

        await session.withTransaction(async () => {
          //getting the target clinic
          const clinicDataOnRemove = await Clinic.findOne({
            _id: clinicId,
          });

          clinicDataOnRemove.doctors.forEach(async doctorID => {
            await Doctor.updateOne(
              {
                _id: doctorID,
              },
              {
                isConnectedToClinic: false,
              },
              {
                session: session,
              }
            );
          });

          const result = await Clinic.deleteOne(
            {
              _id: clinicId,
            },
            {
              session: session,
            }
          );

          //if it removed well

          dataTracer.erasedClinic = clinicDataOnRemove; // will return as that's was the result
        });

        session.endSession();

        resolve({
          success: true,
          data: dataTracer.erasedClinic,
          deletingState: 1,
        });
      } catch (error) {
        reject(new Error(error.message));
      }
    } else {
      reject('db connection problem');
    }
  });
}

/**
 * @very_important : when u display the clinic doctors if u deleted a doctor u will have to update the clinic doctors list
 * @param {string} clinicId
 * @param {string} clinicName
 * @param {string} clinicAddress
 * @param {string} clinicPhone
 * @param {string} clinicDescription
 * @param {string} owner
 */
async function updateClinicDataService(
  clinicId,
  clinicName,
  clinicAddress,
  clinicPhone,
  clinicDescription,
  owner
) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      const dataTracer = {};
      try {
        const clinic = await Clinic.findOne({
          _id: clinicId,
        });

        clinic.name = clinicName;
        clinic.address = clinicAddress;
        clinic.description = clinicDescription;
        clinic.phone = clinicPhone;
        clinic.owner = owner;

        //if all are ok

        await clinic.save();

        dataTracer.data = clinic;

        resolve({
          status: true,
          data: dataTracer.data,
          updateState: 1,
        });
      } catch (error) {
        reject(new Error(error.message));
      }
    } else {
      reject(new Error('db connection problem'));
    }
  });
}

async function getAllClinicDoctors(clinicId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const clinic = await Clinic.findOne({
          _id: clinicId,
        }).populate('doctors');
        //if all are ok
        resolve({
          success: true,
          data: clinic.doctors,
        });
      } catch (error) {
        reject(new Error(error.message));
      }
    } else {
      reject(new Error('db connection problem'));
    }
  });
}

//TODO implement the doctor doctors[workers] control

module.exports = {
  AddClinicService,
  getAllClinicsService,
  eraseClinicData,
  updateClinicDataService,
  getAllClinicDoctors,
};
