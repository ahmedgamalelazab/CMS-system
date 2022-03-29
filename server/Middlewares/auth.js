const mongoose = require('mongoose');

const { request, response } = require('express');

const jwt = require('jsonwebtoken');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.authMiddleWare = async function (req, res, next) {
  console.log("passed auth");
  //suppose that the token will be stored in userToken

  const userToken = req.headers['x-auth-token'];

  if (userToken) {
    try {
      const userObject = jwt.verify(userToken, process.env.ADMIN_SECRET_KEY);
      //if the user who is trying to login is admin \
      //payload with the request with extra payload
      req.payload = {
        userLoad: userObject,
        userType: 'admin',
      };
      next();
    } catch (error) {
      try {
        //try to see if the user token carries Doctors
        const userObject = jwt.verify(userToken, process.env.DOCTOR_SECRET_KEY);
        //all the needed data to send to make extra requests is very simple
        //suppose that everything has made on the login level
        req.payload = {
          userLoad: userObject,
          userType: 'doctor',
        };
        next();
      } catch (subError) {
        try {
          //the last thing is we will suppose that he is a Employee
          const userObject = jwt.verify(
            userToken,
            process.env.EMPLOYEE_SECRET_KEY
          );
          //if all are ok
          req.payload = {
            userLoad: userObject,
            userType: 'employee',
          };
          next();
        } catch (finalError) {
          //u will no go to next and i will cut off here
          res.status(403).json({
            success: false,
            data: null,
            errorMessage: 'u are not authenticated user on the system',
          });
        }
      }
    }
  } else {
    //IN CASE OF NO TOKEN PROVIDED
    res.status(403).json({
      success: false,
      data: null,
      errorMessage: `forbidden .. INVALID TOKEN`,
    });
  }
};
