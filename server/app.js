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
const cors = require('cors');
const { storage } = require('./Services/profileImage/profile.service.js');

/**
 * registering the state of the db connection
 */
//db connecting state
applicationEventTracker.on('DBConnectionState', function (data) {
  console.log(data);
});

//server code
const port = process.env.PORT || 3333;

// multer code

const upload = multer({ storage: storage });
//end of multer code

app.use(cors());
// app.use(helmet()); //HELMET PREVENT ANY REQUEST FROM THE CLIENT SIDE .. GENERATING THIS ERROR ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200
app.use(morgan());
app.put(
  '/app/v1/doctor/profile/update/:id',
  upload.single('doctorProfileImage'), //multer middleware
  function (req, res, next) {
    console.log(`doctor id : ${req.params.id}`);
    console.log(req.file, req.body);
    res.json({
      success: true,
      file: req.file,
      body: req.body,
    });
  }
);
/**
 * @description : allow the server to serve static fils
 */
app.use(express.json());
app.use('/upload', express.static(__dirname + '/uploads'));
app.use('/api/v1', require('./Routes/auth/auth.routes.js'));
app.use('/api/v1', require('./Routes/clinic/clinic.routes.js'));
app.use('/api/v1', require('./Routes/doctor/doctor.routes.js'));
app.use('/api/v1', require('./Routes/employee/employee.routes.js')); // added by mostafa
app.use('/api/v1', require('./Routes/appointment/appointment.routes.js')); // added by mostafa
app.use('/api/v1', require('./Routes/Patient/patient.routes.js'));
app.use('/api/v1', require('./Routes/medicine/medicine.routes.js'));
app.use('/api/v1', require('./Routes/prescription/prescription.routes.js'));
app.use('/', async (re, res, next) => {
  res.status(200).json({
    success: false,
    data: 'hello from default routes',
  });
});

app.listen(port, () => {
  console.log(`server is on and listening on port : ${port}`);
});
