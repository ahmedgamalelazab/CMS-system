const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use('/api/v1', require('./Routes/clinic/clinic.routes'));
app.use('/', async (re, res, next) => {
  res.status(200).json({
    success: false,
    data: 'hello from default routes',
  });
});

app.listen(9999, () => {
  console.log('server is on and listening on port : 9999');
});
