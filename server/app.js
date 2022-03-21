const path = require('path');
const multer = require('multer');
//const upload = multer({ dest: path.join('./', '/uploads') });
require('dotenv').config({
  path: path.join('./', './config.env'),
});
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
//db code
const { applicationEventTracker } = require('./DataBase/db.config.js');

/**
 * registering the state of the db connection
 */
//db connecting state
applicationEventTracker.on('DBConnectionState', function (data) {
  console.log(data);
});

//server code
const port = process.env.PORT || 3333;

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

//multer code

// const { Doctor } = require('./Models/Doctor.js');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join('./', '/uploads'));
//   },
//   filename: async function (req, file, cb) {
//     console.log(req.body);
//     const doctor = await Doctor.create({
//       name: req.body.name,
//     });
//     cb(null, doctor._id.toString() + '.' + file.mimetype.split('/')[1]);
//     doctor.profileImage = `${path.join(
//       './',
//       'upload',
//       `${doctor._id}.${file.mimetype.split('/')[1]}`
//     )}`;
//     await Doctor.updateOne(
//       {
//         _id: doctor._id,
//       },
//       {
//         profileImage: doctor.profileImage,
//       }
//     );
//   },
// });

// const upload = multer({ storage: storage });
// //end of multer code

// app.post(
//   '/app/v1/profile',
//   upload.single('profile'),
//   function (req, res, next) {
//     console.log(req.file, req.body);
//     res.json({
//       file: req.file,
//       body: req.body,
//     });
//   }
// );
// app.use('/images', express.static(__dirname + '/uploads'));
app.use(helmet());
app.use(morgan());
app.use(express.json());
app.use('/api/v1', require('./Routes/clinic/clinic.routes.js'));
app.use('/api/v1', require('./Routes/doctor/doctor.routes.js'));
app.use('/api/v1', require('./Routes/Patient/patient.routes.js'));
app.use('/', async (re, res, next) => {
  res.status(200).json({
    success: false,
    data: 'hello from default routes',
  });
});

app.listen(port, () => {
  console.log(`server is on and listening on port : ${port}`);
});
