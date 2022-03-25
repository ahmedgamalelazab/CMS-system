/**
 * @description : this service will work only for uploading data using multer ..
 * @usage : use this service to update doctors data image profiles after create their clinic successfully
 * @features : ALL CRUD OPERATIONS on the files
 */

//response

/**
 {
  fieldname: 'profile',
  originalname: 'take care of the server.PNG',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: 'uploads',
  filename: '3d654dc48e118efe2cfb0fc5e40f1164',
  path: 'uploads\\3d654dc48e118efe2cfb0fc5e40f1164',
  size: 5964
} [Object: null prototype] {}
 */

const multer = require('multer');
const { Doctor } = require('../../Models/Doctor.js');
const User = require('../../Models/User.js');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('./', '/uploads'));
  },
  filename: async function (req, file, cb) {
    // console.log(req.body);
    const doctorId = req.params.id;
    const doctor = await Doctor.findOne({
      _id: doctorId,
    });
    cb(null, doctor._id.toString() + '.' + file.mimetype.split('/')[1]);
    doctor.profileImage = `${req.protocol + '://' + req.get('host')}/upload/${
      doctor._id
    }.${file.mimetype.split('/')[1]}`;
    const user = await User.findOne({
      _id: doctor.user,
    });
    doctor.name = req.body.doctorName;
    //Updating doctor user data
    user.email = req.body.doctorEmail;
    user.password = req.body.doctorPassword;
    console.log(user);
    await doctor.save();
    await user.save();
  },
});

module.exports = { storage };
