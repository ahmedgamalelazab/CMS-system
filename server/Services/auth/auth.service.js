//auth service

const mongoose = require('mongoose');
const User = require('../../Models/User.js');
const { Doctor } = require('../../Models/Doctor.js');
const Employee = require('../../Models/Employee.js');
const Clinic = require('../../Models/Clinic.js');
const { DBConnection } = require('../../DataBase/db.config.js');
const jwt = require('jsonwebtoken');

/**
 *
 * @param {string} userName
 * @param {string} userPassword
 */
async function authService(userEmail, userPassword) {
  console.log(userEmail,userPassword);
  //TODO checkout the userEmail and Password
  //IF they match anyone in the DB then auth him and give him a token to user with each request
  //best practice is to implement the process using chain of responsibility but we will do it on the regular way
  return new Promise(async (resolve, reject) => {
    if (DBConnection.isConnected()) {
      //if the connection is ok to go

      //before we go search we wanna know if he is admin or not

      if (
        userEmail === process.env.ADMIN_USER &&
        userPassword === process.env.ADMIN_PASSWORD
      ) {
        const token = jwt.sign(
          {
            description: 'this is admin account',
          },
          process.env.ADMIN_SECRET_KEY
        );

        resolve({
          user: 'admin',
          token: token,
        });
      }

      //else go search in the users

      const userFound = await User.findOne({
        email: userEmail,
        password: userPassword,
      });

      //if user found
      if (userFound) {
        //if the user found
        const userId = userFound._id; //this is the userId we will search with

        switch (userFound.userType) {
          case 'doctor':
            const doctorFound = await Doctor.findOne({
              user: userId,
            });
            //if doctor found
            //then we need to gather some extra data with him like what clinic he is tied to
            if (doctorFound) {
              //if the doctor is found we need to know if he is owner or not
              if (doctorFound.isOwner) {
                //some logic if the doctor is owner
                const clinicFound = await Clinic.findOne({
                  owner: doctorFound._id,
                });
                //now this doctor is authed and lets payload his token
                const token = jwt.sign(
                  {
                    doctorData: doctorFound,
                    clinicData: clinicFound,
                  },
                  process.env.DOCTOR_SECRET_KEY
                );
                resolve({
                  user: 'doctor',
                  token: token,
                  doctorOwner: 'true',
                });
              } else {
                //some logic if the doctor is not owner
                //in order to know the clinic of the non-owner doctor we are going to search by his assigned by doc
                const assignedById = doctorFound.assignedBy;
                //TODO clean this repeated functions group
                const clinicFound = await Clinic.findOne({
                  owner: assignedById,
                });
                //now this doctor is authed and lets payload his token
                const token = jwt.sign(
                  {
                    doctorData: doctorFound,
                    clinicData: clinicFound,
                  },
                  process.env.DOCTOR_SECRET_KEY
                );
                resolve({
                  user: 'doctor',
                  token: token,
                  doctorOwner: 'false',
                });
              }
            } else {
              reject(
                new Error(
                  'invalid email or password , pleas check your data with the system-admin and try again'
                )
              );
            }
            break;
          case 'employee':
            //IF THE USER IS EMPLOYEE
            const employeeFound = await Employee.findOne({
              user: userId,
            });

            if (employeeFound) {
              //get who assigned him as employee
              const assignedById = employeeFound.assignedBy; // he must be owner
              const clinicFound = await Clinic.findOne({
                owner: assignedById,
              });
              //now this doctor is authed and lets payload his token
              const token = jwt.sign(
                {
                  employeeData: employeeFound,
                  clinicData: clinicFound,
                },
                process.env.EMPLOYEE_SECRET_KEY    ///  Mostafa
              );
              resolve({
                user: 'employee',
                token: token,
              });
            } else {
              reject(
                'INVALID email or password , pleas check your email with the system-admin'
              );
            }

            break;
          default:
            reject(
              new Error(
                'Invalid email or password pleas check your email with the system-admin'
              )
            );
            break;
        }
      } else {
        reject(
          new Error(
            'Invalid email or password pleas check you data with the system-admin and try again  '
          )
        );
      }
    } else {
      reject(new Error('db connection problem'));
    }
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// SOME EXTRA STRATEGIES /////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = authService;
