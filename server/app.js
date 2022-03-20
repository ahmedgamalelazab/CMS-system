const path = require('path');
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

app.use('/api/v1', require('./Routes/clinic/clinic.routes'));
app.use('/', async (re, res, next) => {
  res.status(200).json({
    success: false,
    data: 'hello from default routes',
  });
});

app.listen(port, () => {
  console.log(`server is on and listening on port : ${port}`);
});
