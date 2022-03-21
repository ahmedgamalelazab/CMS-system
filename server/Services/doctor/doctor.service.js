/**
 * @description: doctors services
 */
const mongoose = require('mongoose'); //for transactions purposes
const { Doctor } = require('../../Models/Doctor.js');
const Clinic = require('../../Models/Clinic.js');
const User = require('../../Models/User.js');
const { DBConnection } = require('../../DataBase/db.config.js');

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
      reject(new Error('db connection error'));
    }
  });
}

module.exports = {
  addDoctorToClinicService,
};
