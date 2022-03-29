const User = require('../../Models/User');
const Employee = require('./../../Models/Employee');
const mongoose = require('mongoose'); //only for transaction purposes
const { DBConnection } = require('../../DataBase/db.config.js');

async function getAllEmployeesService() {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const employees = await Employee.find();
        console.log(employees);
        resolve({
          success: true,
          data: employees,
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
async function getClinicEmployeesService(clinicId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      try {
        const employees = await Employee.find({
          clinic: clinicId,
        }).populate('user');
        resolve({
          success: true,
          data: employees,
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
 * @param {string} employeeId
 * @returns {Promise}
 */
 async function getEmployeeByIdService(employeeId) {
    return new Promise(async (resolve, reject) => {
      if (DBConnection.isConnected()) {
        try {
          const employee = await Employee.findOne({
            _id: employeeId,
          });
          resolve({
            success: true,
            data: employee,
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
 * @param {string} empName
 * @param {number} empAge
 * @param {number} salary
 * @param {string} userEmail
 * @param {string} userPassword
 * @param {string} clinicId
 * @param {string} assignedBy
 * @description :  add employees to the clinic
 */
 async function addEmployeeService(
    empName,
    empAge,
    salary,
    userEmail,
    userPassword,
    clinicId,
    assignedBy,
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
                  userType: 'employee',
                },
              ],
              {
                session: session,
              }
            );
  
            const employee = await Employee.create(
              [
                {
                  name: empName,
                  age: empAge,
                  salary: salary,
                  user: user[0]._id,
                  clinic: clinicId,
                  assignedBy: assignedBy, //this will come with token but for now we will pass it in the param
                },
              ],
              { session: session }
            );
  
            console.log(employee);

            await employee[0].save();
            await user[0].save();
  
            dataTracer.userData = user[0];
            dataTracer.employeeData = employee[0];
  
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
        reject(new Error('db connection problem'));
      }
    });
  }

/**
 *
 * @param {string} empId
 * @param {string} empName
 * @param {number} empAge
 * @param {number} salary
 * @description :  update employee data
 */
 async function updateEmployeeService(
    empId,
    empName,
    empAge,
    salary
  ) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      const dataTracer = {};
      try {
        //the employee not allowed to edit his clinic id or any one else allowed
        const updateEmployee = await Employee.updateOne(
          {
            _id: empId,
          },
          {
            name: empName,
            age: empAge,
            salary: salary
          }
        );
        const updatedEmployee = await Employee.findOne({
          _id: empId,
        });

        //if all are ok
        dataTracer.updatedEmployeeData = updatedEmployee;
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
 * @param { string } employeeId
 * @returns { Promise }
 */
async function deleteEmployeeService(empId) {
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
        const session = await mongoose.startSession(); // client session
      const dataTracer = {};
      try {
        await session.withTransaction(async () => {
        const targetEmployee = await Employee.findOne({
          _id: empId,
        });

        const userId = targetEmployee.user;
        await User.deleteOne(
            {
              _id: userId,
            },
            {
              session: session,
            }
          );
        
        await Employee.deleteOne({
          _id: empId,
        },
        {
          session: session,
        });

        dataTracer.deletedEmployee = targetEmployee;
    });

        await session.endSession();
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
  getAllEmployeesService,
  getEmployeeByIdService,
  getClinicEmployeesService,
  addEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
};
