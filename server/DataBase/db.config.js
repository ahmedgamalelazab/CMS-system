const mongoose = require('mongoose');
const EventEmitter = require('events').EventEmitter;
const applicationEventTracker = new EventEmitter();

/**
 * CONNECTION STATE is a singleton class provide the system with the latest informations about the db state
 */
class DBConnectionState {
  constructor(connectionState) {
    this.connectionState = connectionState;
  }
  setConnectionState(connectionState) {
    this.connectionState = connectionState;
  }
  getConnectionState() {
    return this.connectionState;
  }
  isConnected() {
    if (
      this.connectionState === 'connected' ||
      this.connectionState === 'opened'
    ) {
      return true;
    } else {
      return false;
    }
  }
}

const DBConnection = new DBConnectionState('disconnected');

async function connectDB() {
  try {
    //try to connect to the db

    mongoose.connection.on('connecting', function () {
      DBConnection.setConnectionState('connecting');
      applicationEventTracker.emit('DBConnectionState', {
        status: true,
        state: 'connecting',
      });
    });

    mongoose.connection.on('connected', function () {
      DBConnection.setConnectionState('connected');
      applicationEventTracker.emit('DBConnectionState', {
        success: true,
        state: 'connected',
      });
    });

    mongoose.connection.on('open', function () {
      DBConnection.setConnectionState('opened');
      applicationEventTracker.emit('DBConnectionState', {
        success: true,
        state: 'connection opened',
      });
    });

    mongoose.connection.on('error', function (error) {
      DBConnection.setConnectionState('connectionError');
      applicationEventTracker.emit('DBConnectionState', error);
    });

    mongoose.connection.on('disconnected', function () {
      DBConnection.setConnectionState('disconnected');
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
  DBConnection,
};
