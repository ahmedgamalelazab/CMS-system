/**
 * @description: doctors services
 */
const mongoose = require('mongoose'); //for transactions purposes
const { Doctor } = require('../../Models/Doctor.js');
const Clinic = require('../../Models/Clinic.js');
const User = require('../../Models/User.js');
const { DBConnection } = require('../../DataBase/db.config.js');
const Employee = require('../../Models/Employee.js');
const Appointment = require('../../Models/Appoinment.js');
const Patient = require('../../Models/Patient.js');
const Prescription = require('../../Models/Prescription.js');

/**
 *
 * @param {string} docName
 * @param {number} docAge
 * @param {boolean} isOwner
 * @param {string} assignedBy
 * @description :  only the owner of the clinic has the ability to assign another doctors to the clinic
 * @auth : only doctors who can assign another or inserting another doctors to the system but admins can only track down and delete
 */
async function addDoctorToClinicService(
  docName,
  docAge,
  assignedBy,
  userEmail,
  userPassword
) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      const session = await mongoose.startSession(); // client session
      try {
        const dataTracer = {};
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

          const doctor = await Doctor.create(
            [
              {
                name: docName,
                age: docAge,
                user: user[0]._id,
                isOwner: false, //he is not owner because simply he is been added by another doctor[owner]
                assignedBy: assignedBy, //this will come with token but for now we will pass it in the param
              },
            ],
            { session: session }
          );

          console.log(doctor);

          const clinic = await Clinic.findOne({
            owner: assignedBy,
          });

          clinic.doctors.push(doctor[0]._id);
          doctor[0].isConnectedToClinic = true;

          await clinic.save();
          await doctor[0].save();
          await user[0].save();

          dataTracer.userData = user[0];
          dataTracer.doctorData = doctor[0];
          dataTracer.clinicData = clinic;

          //if all are ok
        });

        await session.endSession(); //end session
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

//get all the doctors

/**
 *
 * @returns {Promise}
 * @description: get all doctors on the system but only admin is allowed to do so
 */
async function getAllDoctorsService() {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      const result = await Doctor.find();
      //if all are ok
      resolve({
        success: true,
        data: result,
      });
    } else {
      reject(new Error('db connection problem'));
    }
  });
}

/**
 *@very_important : each time we will delete a doctor we need to erase his appointment records , anything else we will keep it but mark it assigned by
 * @param {string} docId
 * @returns {Promise}
 */
async function removeDoctorService(docId) {
  /**
   * @dependencies : Employee [in case of he is owner] , clinic [in case of he is owner] ,
   *  Patients , prescription
   */

  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      //if connected
      const session = await mongoose.startSession();
      const dataTracer = {};
      try {
        await session.withTransaction(async () => {
          const targetDoc = await Doctor.findOne({
            _id: docId,
          });

          if (targetDoc.isOwner) {
            //some code for the owner
            //delete the clinic data
            //delete the Employee data

            //clear all tied doctors to him
            const tiedDocs = await Doctor.find({
              assignedBy: docId,
            });

            if (tiedDocs.length !== 0) {
              tiedDocs.forEach(async tiedDoc => {
                let tiedDocUserId = tiedDoc.user;
                await User.deleteOne(
                  {
                    _id: tiedDocUserId,
                  },
                  {
                    session: session,
                  }
                );
              });
              dataTracer.clearedTiedDocsUsers = true;
            }

            //get ride from his doctors he hired
            await Doctor.deleteMany(
              {
                assignedBy: docId,
              },
              {
                session: session,
              }
            );

            dataTracer.clearedOwnerDocs = true;

            const targetEmp = await Employee.find({
              assignedBy: docId,
            });

            if (targetEmp.length !== 0) {
              //there's employee assigned by this doc owner id
              const deleteEmp = await Employee.deleteMany(
                {
                  assignedBy: docId,
                },
                {
                  session: session,
                }
              );

              dataTracer.docIsOwner = true;
              dataTracer.clearedEmpData = true;
            }

            //else , that's mean this doctor didn't hire anyone yet

            //get ride of his clinic
            const deleteOwnerClinic = await Clinic.deleteOne(
              {
                owner: docId,
              },
              {
                session: session,
              }
            );

            //if all are ok
            dataTracer.docIsOwner = true;

            dataTracer.clearedHisClinic = true;

            //lets go and get all the patients that this doctor is tied to

            await editDocData(
              docId,
              Appointment,
              dataTracer,
              Prescription,
              session,
              Doctor,
              User
            );
            //else , this doctor not yet made a appointment record
          } else {
            //some code for any else
            //he is not owner
            dataTracer.isOwner = false;
            await editDocData(
              docId,
              Appointment,
              dataTracer,
              Prescription,
              session,
              Doctor,
              User
            );
          }
        });

        await session.endSession();

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

/**
 *
 * @param {string} docId
 * @param {Appointment} Appointment
 * @param {Object} dataTracer
 * @param {Prescription} Prescription
 * @param {any} session
 * @param {Doctor} Doctor
 * @param {User} User
 */
async function editDocData(
  docId,
  Appointment,
  dataTracer,
  Prescription,
  session,
  Doctor,
  User
) {
  const appointments = await Appointment.find({
    doctor: docId,
  });
  if (appointments.length !== 0) {
    //thant's mean this doctor has record
    appointments.forEach(async appointment => {
      let patient = await Patient.findById(appointment.patient);
      patient.tiedTo = patient.tiedTo.filter(doc => {
        return doc !== docId;
      });
      await patient.save();
    });

    await Appointment.deleteMany(
      {
        doctor: docId,
      },
      {
        session: session,
      }
    );

    dataTracer.erasedDocAppointments = true;
  }

  //get ride of his prescriptions
  const docPrescriptions = await Prescription.find({
    doctor: docId,
  });

  if (docPrescriptions.length !== 0) {
    //this doctor has record
    docPrescriptions.forEach(async prescription => {
      prescription.tiedToDoctor = false;
      await prescription.save();
    });

    dataTracer.doctorClearedPrescriptionData = true;
  }

  //cleaning his corresponding user data
  const doc = await Doctor.findOne({
    _id: docId,
  });

  const docUserId = doc.user;

  await User.deleteOne({
    _id: docUserId,
  });

  dataTracer.clearedDocUserData = true;

  //clearing their own data
  await Doctor.deleteOne(
    {
      _id: docId,
    },
    {
      session: session,
    }
  );

  dataTracer.clearedDocMainData = true;
  //cleaning his user Data
}

module.exports = {
  addDoctorToClinicService,
  getAllDoctorsService,
  removeDoctorService,
};
