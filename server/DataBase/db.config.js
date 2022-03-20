const mongoose = require('mongoose');
const EventEmitter = require('events').EventEmitter;
const applicationEventTracker = new EventEmitter();

async function connectDB() {
  try {
    //try to connect to the db

    mongoose.connection.on('connecting', function () {
      applicationEventTracker.emit('DBConnectionState', {
        status: true,
        state: 'connecting',
      });
    });

    mongoose.connection.on('connected', function () {
      applicationEventTracker.emit('DBConnectionState', {
        success: true,
        state: 'connected',
      });
    });

    mongoose.connection.on('open', function () {
      applicationEventTracker.emit('DBConnectionState', {
        success: true,
        state: 'connection opened',
      });
    });

    mongoose.connection.on('error', function (error) {
      applicationEventTracker.emit('DBConnectionState', error);
    });

    mongoose.connection.on('disconnected', function () {
      applicationEventTracker.emit('DBConnectionState', {
        success: false,
        state: 'disconnected',
      });
    });
    await mongoose.connect(process.env.DBConnection);
  } catch (error) {
    //handle error by providing function to close or reconnect again to the db
    //we can implement function that can close the server
    //or we can emit logger state
  }
}

connectDB();

module.exports = {
  applicationEventTracker,
};
