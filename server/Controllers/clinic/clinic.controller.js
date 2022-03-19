//building example data
//place holder data
const { request, response } = require('express');
/**
 * data example
 const clinics = [
  new Clinic(
    'cafa1e2b-a46e-4a32-82e6-c9c1c0082ae0',
    'National Clinic',
    [
      new Doctor(
        '91cf741b-735b-445a-b4f6-3167de034b01',
        'ahmed sameh',
        44,
        4000,
        new User('ahmedSamah', '123456'),
        'cafa1e2b-a46e-4a32-82e6-c9c1c0082ae0',
        true,
        './doctors/profiles/91cf741b-735b-445a-b4f6-3167de034b01/profile.png'
      ),
    ],
    '313 Surrey Avenue',
    '+880 545 190 1948',
    'clinic with all the feature that any patient dream with',
    '91cf741b-735b-445a-b4f6-3167de034b01'
  ),
];
 */

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.getAllClinicsController = async function (req, res, next) {
  res.status(200).json({
    success: true,
    data: 'data clinic sent to user here',
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
module.exports.doctorAssignClinicDoctor = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: 'get all clinic doctors logic result will be sent to the user',
  });
};
