const { request, response } = require('express');
const {
  addPrescription,
  deletePrescription,
  getAllPrescription,
  getPrescriptionById,
  updatePrescription,
  getPrescriptionsByClinicId,   /// Mostafa
  getPendingPrescriptionsByClinicId,    /// Mostafa
} = require('../../Services/prescription/prescriptionService.js');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.getAllPrescriptionsController = async (req, res, next) => {
  try {
    const result = await getAllPrescription();

    //if all are ok

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
module.exports.getPrescriptionByIdController = async (req, res, next) => {
  try {
    const prescriptionId = req.params.id;
    const result = await getPrescriptionById(prescriptionId);
    //if all are ok
    res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
 module.exports.getPrescriptionByClinicIdController = async (req, res, next) => {
  try {
    console.log(req.payload)
    if(req.payload.userType === 'employee' || req.payload.userType === 'doctor'){
      let clinicId ;
      if(req.payload.userType === 'employee'){
        clinicId = req.payload.userLoad.employeeData.clinic;
      }else{
        clinicId = req.payload.userLoad.clinicData._id;
      }
      console.log(clinicId)
      const result = await getPrescriptionsByClinicId(clinicId);
      //if all are ok
      res.status(200).json({
        success: true,
        data: result.data,
      });
    }else{
      throw new Error("FORBIDDEN");
    }
    
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      error:error
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
 module.exports.getPendingPrescriptionByClinicIdController = async (req, res, next) => {
  try {
    if(req.payload.userType === 'employee'){
      const clinicId = req.payload.userLoad.employeeData.clinic;
      console.log(clinicId)
      const result = await getPendingPrescriptionsByClinicId(clinicId);
      //if all are ok
      res.status(200).json({
        success: true,
        data: result.data,
      });
    }else{
      throw new Error("FORBIDDEN");
    }
    
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      error:error
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.addPrescriptionController = async (req, res, next) => {
  try {
    const { patient, medicine,
      date, hasPayed, totalPrice, paymentMethod, tiedToDoctor } = req.body;

    const doctorId = req.payload.userLoad.doctorData._id;    
    const clinicId = req.payload.userLoad.clinicData._id;  
    const result = await addPrescription(
      doctorId,
      clinicId,
      patient,
      medicine,
      date,
      hasPayed,
      totalPrice,
      paymentMethod,
      tiedToDoctor
    );

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
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.updatePrescriptionController = async (req, res, next) => {
  try {
    const prescriptionId = req.params.id;

    const { medicine, date, hasPayed, totalPrice, paymentMethod, tiedToDoctor } = req.body;

    const result = await updatePrescription(
      prescriptionId,
      medicine,
      date,
      hasPayed,
      totalPrice,
      paymentMethod,
      tiedToDoctor
    );
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
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.removePrescriptionController = async (req, res, next) => {
  try {
    const prescriptionId = req.params.id;

    const result = await deletePrescription(prescriptionId);

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
