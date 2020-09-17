const Buffer = require('buffer/').Buffer;
import { saveSync, getSync, saveProfile as sProfile, getProfile as gProfile } from './DatabaseProxy';
import { write, read } from './FileSystemProxy';
import { s3 } from './HttpProxy';
import { simulator } from '../utils/config.js';

export const getProfile = () => {
  return gProfile();
}

export const saveProfile = (profile) => {
  return sProfile(profile);
}

export const getLastSyncTime = () => {
  return getSync();
}

export class Synchronizer {
  constructor(BLE, deviceID) {
    this.BLE = BLE;
    this.readData = null;
    this.deviceID = deviceID;
  }

  sync = async (callback) => {
    if (simulator) {
      let time = await saveSync();
      callback(time);
    }
    else {
      this.callback = callback;
      this.BLE.syncData(this.deviceID, this.handleNotification);
    }
  }

  handleNotification = (error, characteristic) => {
    let buf = new Buffer(characteristic.value, 'base64');
    let data = buf.toJSON().data;

    if (this.readData === null) this.receiveDataSize(data);
    else if (this.readData.length < this.toReadLength - 1) this.receiveData(data);
    else this.finishReceiveData(data);
  }

  receiveDataSize = (data) => {
    this.toReadLength = data.reduce((a,b) => { return a + b; });
    console.log("toReadLength", this.toReadLength);
    this.readData = [];
  }

  receiveData = (data) => {
    this.readData = this.readData.concat(data);
    console.log(this.readData);
  }

  finishReceiveData = async (data) => {
    this.readData.push(data);
    this.readData = this.readData.concat(data);
    console.log(this.readData);
    this.BLE.endSync();
    this.readData = null;

    let time = await saveSync();
    this.callback(time);
  }

};

  /*this.props.BLE.syncData(this.props.device.uuid, (error, data) => {
    let buf = new Buffer(data.value, 'base64');

    if (this.max === null || this.max === undefined || this.count === null || this.count === undefined) {
      this.max = buf.toJSON().data[0];
      this.count = 0;
      console.log("set max to " + this.max);
    }

    else if (this.count < this.max) {
      this.count++;
      console.log(buf.toJSON().data[0], this.count);
    }

    else {
      console.log(buf.toJSON().data[0], this.count);
      this.count = null;
      this.max = null;
      callback();
      this.props.BLE.endSync();
    }
  });
  /*receiveData( (resp) => {
    write(JSON.stringify(resp.data), () => {
      let time = Date.now();
      AsyncStorage.setItem(`lastSync`, JSON.stringify(time)).then(() => {
        this.setState({lastSync: time});
        callback();
      });
    });
  });*/
