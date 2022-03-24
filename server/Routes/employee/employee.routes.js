const Router = require('express').Router();

const {
  getAllEmployeesController,
  getEmployeeByIdController,
  getAllEmployeesInClinicController,
  AddEmployeeController,
  UpdateEmployeeController,
  RemoveEmployeeController,
} = require('../../Controllers/employee/employee.controller.js');

const { authMiddleWare } = require('../../Middlewares/auth.js');

Router.route('/employee').get(getAllEmployeesController);
Router.route('/employee/:id').get(getEmployeeByIdController);
/**
 * @HadeerEladawey1212
 * @MoMazen
 * @Reem395
 * @Yasser-Abd-El-Hady
 * @warning : this route is protected now .. Pleas login to get hte data
 */
Router.route('/employee/clinic/:clinicId').get(
  authMiddleWare,
  getAllEmployeesInClinicController
);
Router.route('/employee/add').post(AddEmployeeController);
Router.route('/employee/remove/:id').delete(RemoveEmployeeController);
Router.route('/employee/update/:id').put(UpdateEmployeeController);

module.exports = Router;
