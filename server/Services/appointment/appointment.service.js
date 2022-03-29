const Appointment = require('../../Models/Appoinment.js');
const { DBConnection } = require('../../DataBase/db.config.js');
const Patient = require('../../Models/Patient.js');
const { Doctor } = require('../../Models/Doctor.js');

async function getAllAppointmentService() {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const appointments = await Appointment.find().populate('clinic').populate('doctor').populate('patient');
        resolve({
          success: true,
          data: appointments,
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
 * @param {string} clinicId
 * @returns {Promise}
 */
async function getClinicAppointmentsService(clinicId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const appointments = await Appointment.find({
          clinic: clinicId,
        })
          .populate('clinic').populate('doctor').populate('patient');
        resolve({
          success: true,
          data: appointments,
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
   * @param {string} clinicId
   * @param {string} date
   * @returns {Promise}
   */
 async function getClinicAppointmentsByDateService(clinicId,date) {
  date = new Date(date);
  console.log(date);
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const appointments = await Appointment.find({
          clinic: clinicId,
          date:date
        }).populate('doctor').populate('patient');
        resolve({
          success: true,
          data: appointments,
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
 * @param {string} doctorId
 * @returns {Promise}
 */
async function getDoctorAppointmentsService(doctorId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const appointments = await Appointment.find({
          doctor: doctorId,
        }).populate('clinic').populate('doctor').populate('patient');
        resolve({
          success: true,
          data: appointments,
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
async function getPatientAppointmentsService(patientId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const appointments = await Appointment.find({
          patient: patientId,
        }).populate('clinic').populate('doctor').populate('patient');
        resolve({
          success: true,
          data: appointments,
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
   * @param {string} appointmentId
   * @returns {Promise}
   */
async function getAppointmentByIdService(appointmentId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const appointment = await Appointment.findOne({
          _id: appointmentId,
        }).populate('clinic').populate('doctor').populate('patient');
        resolve({
          success: true,
          data: appointment,
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
 * @param {string} clinicId
 * @param {string} patientId
 * @param {string} doctorId
 * @param {Date} date
 * @param {boolean} isConfirmed
 * @param {number} totalPrice
 * @param {string} payment
 */
async function addAppointmentService(
  clinicId,
  doctorId,
  patientId,
  date,
  isConfirmed,
  totalPrice,
  payment,
) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const dataTracer = {};

        const appointment = await Appointment.create(
          [
            {
              clinic: clinicId,
              patient: patientId,
              doctor: doctorId,
              date: date,
              isConfirmed: isConfirmed,
              totalPrice: totalPrice,
              payment: payment,
            },
          ],
        );

        await appointment[0].save();

        dataTracer.appointmentData = appointment;

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
 * @param {string} appointmentId
 * @param {Date} date
 * @param {boolean} isConfirmed
 * @param {number} totalPrice
 * @param {string} payment
 */
async function updateAppointmentService(
  appointmentId,
  date,
  isConfirmed,
  totalPrice,
  payment
) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      const dataTracer = {};
      try {
        //the employee not allowed to edit his clinic id or any one else allowed
        const updateAppointment = await Appointment.updateOne(
          {
            _id: appointmentId,
          },
          {
            date: date,
            isConfirmed: isConfirmed,
            totalPrice: totalPrice,
            payment: payment,
          }
        );
        const updatedAppointment = await Appointment.findOne({
          _id: appointmentId,
        });

        //if all are ok
        dataTracer.updatedAppointmentData = updatedAppointment;
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
 * @param { string } appointmentId
 * @returns { Promise }
 */
async function deleteAppointmentService(appointmentId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      const dataTracer = {};
      try {
        const targetAppointment = await Appointment.findOne({
          _id: appointmentId
        })
        await Appointment.deleteOne({
          _id: appointmentId,
        });

        dataTracer.deletedAppointment = targetAppointment;

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
  getAllAppointmentService,
  getClinicAppointmentsService,
  getDoctorAppointmentsService,
  getPatientAppointmentsService,
  getAppointmentByIdService,
  addAppointmentService,
  updateAppointmentService,
  deleteAppointmentService,
  getClinicAppointmentsByDateService
};