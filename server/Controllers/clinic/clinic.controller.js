//building example data
//place holder data
const { request, response } = require('express');
const {
  AddClinicService,
  getAllClinicsService,
  eraseClinicData,
  updateClinicDataService,
  getAllClinicDoctors,
} = require('../../Services/Clinic/Clinic.service.js');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @ahmedgamalelazab //fix cinflict here accept both 
 */
module.exports.getAllClinicsController = async function (req, res, next) {
  try {
    if (req.payload.userType === 'admin' || req.payload.userType === 'employee') {
      const result = await getAllClinicsService();
      //if the result came ok !
      res.status(200).json({
        success: true,
        data: result.data,
      });
    } else {
      throw new Error('FORBIDDEN');
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.addClinicController = async function (req, res, next) {
  //body will send me a clinic data
  //the body will send the client form data then we will ask the service to insert the record in the db

  try {
    if (req.payload.userType === 'admin') {
      const {
        clinicName,
        clinicAddress,
        clinicPhone,
        clinicDescription,
        userEmail,
        userPassword,
        docName,
        docAge,
        iswOwner,
        assignedBy,
      } = req.body;

      const result = await AddClinicService(
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
      );

      res.status(201).json({
        success: true,
        data: result.data,
      });
    } else {
      throw new Error('FORBIDDEN');
    }

    //if no error
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
module.exports.removeClinicDataController = async (req, res, next) => {
  try {
    if (req.payload.userType === 'admin') {
      const clinicId = req.params.id;
      const result = await eraseClinicData(clinicId);
      res.status(201).json({
        success: true, //FIXED BUG
        data: result.data,
        deletingState: result.deletingState,
      });
    } else {
      throw new Error('FORBIDDEN');
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
module.exports.updateClinicDataController = async (req, res, next) => {
  try {
    if (req.payload.userType === 'admin') {
      const clinicId = req.params.id;
      const {
        clinicName,
        clinicAddress,
        clinicPhone,
        clinicDescription,
        owner,
      } = req.body;
      const result = await updateClinicDataService(
        clinicId,
        clinicName,
        clinicAddress,
        clinicPhone,
        clinicDescription,
        owner
      );

      //if all are ok
      res.status(201).json({
        success: true,
        data: result.data,
        updateState: result.updateState,
      });
    } else {
      throw new Error('FORBIDDEN');
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
 * @very_important
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.getAllClinicsDoctorsController = async (req, res, next) => {
  try {
    if (req.payload.userType === 'admin' || req.payload.userType === 'employee' || req.payload.userType === 'doctor') {
      let clinicId = '';
      if (req.payload.userType === 'admin') {
        clinicId = req.params.id; //from doctor clinic ui
      } else if(req.payload.userType === 'employee'){
        clinicId = req.payload.userLoad.employeeData.clinic;
      }else{
        clinicId = req.payload.userLoad.clinicData._id;
      }

      const result = await getAllClinicDoctors(clinicId);
      res.status(200).json({
        success: true,
        data: result.data,
      });

    } else {
      throw new Error('FORBIDDEN');
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      errorMessage: error.message,
    });
  }
};
