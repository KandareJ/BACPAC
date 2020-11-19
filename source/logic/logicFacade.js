const Buffer = require('buffer/').Buffer;
import { saveSync, getSync, clearSync, saveProfile as sProfile, getProfile as gProfile, savePatient as sPatient } from './DatabaseProxy';
import { write, read, deleteFile } from './FileSystemProxy';
import { s3 } from './HttpProxy';
import { simulator } from '../utils/config.js';

export const getProfile = () => {
  return gProfile();
}

export const saveProfile = (profile) => {
  return sProfile(profile);
}

export const savePatient = (patient) => {
  return sPatient(patient)
}

export const getLastSyncTime = () => {
  return getSync();
}

export const finish = async (failure) => {
  let aws = new s3();
  let profile = await getProfile();
  profile.finishTime = new Date();
  let buf = new Buffer(JSON.stringify(profile));
  let key = `patient/${profile.last_name}:${buf.toString('base64')}`;
  let body = await read();
  aws.uploadFile(key, body, onUpload, failure);
}

const onUpload = () => {
  console.log("data successfully uploaded to AWS");
  clearSync();
  deleteFile();
}

export class Synchronizer {
  constructor(BLE, deviceID) {
    this.BLE = BLE;
    this.readData = null;
    this.deviceID = deviceID;
  }

  sync = async (callback) => {
    if (simulator) {
      await deleteFile();
      await write(JSON.stringify([0, 1, 2, 3]));
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
    this.readData = this.readData.concat(data);
    console.log(this.readData);
    this.BLE.endSync();

    await write(JSON.stringify(this.readData));
    this.readData = null;
    let time = await saveSync();
    this.callback(time);
  }

};

export const push = async (success, profileError) => {

}
