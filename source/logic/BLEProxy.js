import { BleManager } from 'react-native-ble-plx';
import { simulator } from '../utils/config';

export default class BLEProxy {
  // public
  constructor() {
    if (simulator) {
      // do nothing
    }
    else {
      this.manager = new BleManager();
    }
  }

  scan = async (callback) => {
    if (simulator) {
      callback(null, {name: "BACPAC", id: "asdf-ghjk-lmnb"})
    }
    else {
      const isOn = await this.manager.state();
      if (isOn !== 'PoweredOn') {
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
              subscription.remove();
                this.scan(callback);
            }
        }, true);
      }
      else {
        this.manager.startDeviceScan(null, null, callback);
      }
    }
  }

  syncData = async (deviceID, onReceiveData) => {
    if (simulator) {
      onReceiveData(1);
      return;
    }
    let device = await this.manager.discoverAllServicesAndCharacteristicsForDevice(deviceID);
    let services = await device.services();
    let characteristics = await this.manager.characteristicsForDevice(deviceID, services[0].uuid);
    //let battery = await device.readCharacteristicForService(services[0].uuid, characteristics[0].uuid);
    this.manager.monitorCharacteristicForDevice(deviceID, services[0].uuid, characteristics[0].uuid, onReceiveData, 'sync');
  }

  endSync = () => {
    if (simulator) return;
    this.manager.cancelTransaction('sync');
  }

  connect = async (deviceID, callback, onDisconnect) => {
    if (simulator) {
      callback();
    }
    else {
      this.manager.stopDeviceScan();
      await this.manager.connectToDevice(deviceID);
      await this.manager.onDeviceDisconnected(deviceID, onDisconnect);
      callback();
    }
  }

}
