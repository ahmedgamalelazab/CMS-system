//building example data
//place holder data
const { request, response } = require('express');
const Clinic = require('../../Models/Clinic.js');
const User = require('../../Models/User.js');
const { Doctor } = require('../../Models/Doctor.js');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.getAllClinicsController = async function (req, res, next) {
  const user = await User.create({
    email: 'agemy844@gmail.com',
    password: '12345',
    userType: 'doctor',
  });

  const doctorTest = await Doctor.create({
    name: 'testDoc',
    age: 55,
    salary: 3344,
    user: user._id,
    isOwner: true,
    profileImage: 'none',
    owner: null,
  });

  const docFullData = await Doctor.findOne({
    name: 'testDoc',
  }).populate({
    path: 'user',
  });

  const clinicTest = await Clinic.create({
    name: 'tsetClinic',
    doctors: [doctorTest],
    address: 'testing address',
    phone: '01032122442',
    description: 'testing description',
    owner: doctorTest._id,
  });

  res.status(200).json({
    success: true,
    data: docFullData,
  });
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.addClinicController = async function (req, res, next) {
  //body will send me a clinic data
  res.status(201).json({
    success: true,
    data: 'add clinic logic result will be sent to user',
  });
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.removeClinicDataController = async (req, res, next) => {
  res.status(201).json({
    success: true,
    data: 'remove clinic logic result will be sent to the user',
  });
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.updateClinicDataController = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'update clinic logic will be sent to the user',
  });
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.getAllClinicsDoctorsController = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'get all clinic doctors logic result will be sent to the user',
  });
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this api for the doctor [OWNER] to assign to his clinic doctors
 */
module.exports.ownerAssignClinicDoctor = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'get all clinic doctors logic result will be sent to the user',
  });
};
