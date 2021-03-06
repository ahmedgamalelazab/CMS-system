const { request, response } = require('express');
const {
  addDoctorToClinicService,
  getAllDoctorsService,
  removeDoctorService,
  getAllDoctorPatientsService,
  updateDoctorService,
  getDoctorByIdService,
} = require('../../Services/doctor/doctor.service.js');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @allowed : ONLY ADMIN
 */
module.exports.getAllDoctorsController = async (req, res, next) => {
  try {
    
    console.log(req.payload)
    if (req.payload.userType === 'admin') {
      const result = await getAllDoctorsService();
      //if all are ok
      res.status(200).json({
        success: true,
        data: result.data,
      });
    }
    else {
      res.status(403).json({
        success: false,
        data: null,
        errorMessage: 'FORBIDDEN',
      });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      errorMessage: error.message,
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @allowed : ONLY ADMIN
 */
 module.exports.getDoctorByIdController = async (req, res, next) => {
  try {

    if (req.payload.userType === 'admin' || req.payload.userType === 'doctor') {
      const docId = req.params.id;
      const result = await getDoctorByIdService(docId);
      //if all are ok
      res.status(200).json({
        success: true,
        data: result.data,
      });
    }
    else {
      res.status(403).json({
        success: false,
        data: null,
        errorMessage: 'FORBIDDEN',
      });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      errorMessage: error.message,
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description you can add doctor to the system then u can assign him to a clinic , this is only for the admin
 * @admin true only for the admin
 */
module.exports.addDoctorController = async (req, res, next) => {
  try {
    if(req.payload.userType === 'doctor'){
      // console.log(req.payload.);
      const { docName, docAge, userEmail, userPassword } = req.body;

      const assignedBy = req.payload.userLoad.doctorData._id;
      const result = await addDoctorToClinicService(
        docName,
        docAge,
        assignedBy,
        userEmail,
        userPassword
      );
      //if all are ok
      res.status(201).json({
        success: true,
        data: result.data,
      });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      errorMessage: error.message,
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.removeDoctorDataController = async (req, res, next) => {
  try {
    const docId = req.params.id;

    const result = await removeDoctorService(docId);

    //if all are ok

    res.status(201).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      errorMessage: error.message,
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.getAllDoctorPatientsData = async (req, res, next) => {
  try {
    console.log(req.payload)
    const docId = req.payload.userLoad.doctorData._id;

    console.log(docId);
    const result = await getAllDoctorPatientsService(docId);

    //if all are ol

    res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      errorMessage: error.message,
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.updateDoctorDataController = async (req, res, next) => {
  try {
    const docId = req.params.id;
    const { docName, docAge } = req.body;

    const result = await updateDoctorService(docId, docName, docAge);
    //if all are ok
    res.status(201).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      errorMessage: error.message,
    });
  }
};
