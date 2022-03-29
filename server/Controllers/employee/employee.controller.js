const { request, response } = require('express');
const {
  getAllEmployeesService,
  getEmployeeByIdService,
  getClinicEmployeesService,
  addEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
} = require('../../Services/employee/employee.service.js');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 * @description api to get all employees
 */
module.exports.getAllEmployeesController = async (req, res, next) => {
  try {
    const result = await getAllEmployeesService();

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
module.exports.getEmployeeByIdController = async (req, res, next) => {
  try {
    const empId = req.params.id;
    const result = await getEmployeeByIdService(empId);
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
module.exports.getAllEmployeesInClinicController = async (req, res, next) => {
  try {
    if (req.payload.userType === 'admin' || req.payload.userType === 'doctor') {
      let clinicId = '';
      if(req.payload.userType === 'admin'){
        clinicId = req.params.clinicId;
      }else{
        clinicId = req.payload.userLoad.clinicData._id;
      }
      const result = await getClinicEmployeesService(clinicId);
      //if all are ok
      res.status(200).json({
        success: true,
        data: result.data,
      });
    } else {
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
    });
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.AddEmployeeController = async (req, res, next) => {
  try {
    if(req.payload.userType === 'doctor'){
      const { name, age, salary, userEmail, userPassword } = req.body;

      const assignedBy = req.payload.userLoad.doctorData._id;
      const clinicId = req.payload.userLoad.clinicData._id;

      const result = await addEmployeeService(
        name,
        age,
        salary,
        userEmail,
        userPassword,
        clinicId,
        assignedBy
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
 * @description this function is only allowed for the system admin and not allowed to doctors
 */
module.exports.UpdateEmployeeController = async (req, res, next) => {
  try {
    const empId = req.params.id;

    const { name, age, salary } = req.body;

    const result = await updateEmployeeService(empId, name, age, salary);
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
module.exports.RemoveEmployeeController = async (req, res, next) => {
  try {
    const empId = req.params.id;

    const result = await deleteEmployeeService(empId);

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
