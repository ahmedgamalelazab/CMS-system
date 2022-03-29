const { request, response } = require('express');
const authService = require('../../Services/auth/auth.service.js');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {Function} next
 */
module.exports.authController = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    console.log("Controller: ",req.body.email,password);
    const data = await authService(email, password);

    //if all are success
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      errorMessage: error.message,
    });
  }
};
