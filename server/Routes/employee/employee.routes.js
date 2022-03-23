const Router = require('express').Router();

const {
  getAllEmployeesController,
  getEmployeeByIdController,
  getAllEmployeesInClinicController,
  AddEmployeeController,
  UpdateEmployeeController,
  RemoveEmployeeController
} = require('../../Controllers/employee/employee.controller.js');

Router.route('/employee').get(getAllEmployeesController);
Router.route('/employee/:id').get(getEmployeeByIdController);
Router.route('/employee/clinic/:clinicId').get(getAllEmployeesInClinicController);
Router.route('/employee/add').post(AddEmployeeController);
Router.route('/employee/remove/:id').delete(
  RemoveEmployeeController
);
Router.route('/employee/update/:id').put(UpdateEmployeeController);

module.exports = Router;
