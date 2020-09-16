import { saveSync, getSync, saveProfile as sProfile, getProfile as gProfile } from './DatabaseProxy';
import { write, read } from './FileSystemProxy';
import { s3 } from './HttpProxy';

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
  constructor(BLE) {
    this.BLE = BLE
  }

  sync = async (callback) => {
    let time = await saveSync();
    callback(time);
  }
};

  /*this.props.BLE.syncData(this.props.device.uuid, (error, data) => {
    if (error) {
      console.log(error);
      let time = Date.now();
      AsyncStorage.setItem(`lastSync`, JSON.stringify(time)).then(() => {
        this.setState({lastSync: time});
        callback();
      });
      return;
    }
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
