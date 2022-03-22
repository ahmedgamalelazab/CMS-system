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

    const token = await authService(email, password);

    //if all are success
    res.status(200).json({
      success: true,
      data: null,
      token: token,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      data: null,
      token: null,
      errorMessage: error.message,
    });
  }
};
