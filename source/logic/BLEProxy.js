import { BleManager } from 'react-native-ble-plx';

const fakeIt = false;

export default class BLEProxy {
  // public
  constructor() {
    if (fakeIt) {
      // do nothing
    }
    else {
      this.manager = new BleManager();
    }
  }

  scan = async (callback) => {
    if (fakeIt) {
      callback(null, {name: "BACPAC", id: "asdf-ghjk-lmnb"})
    }
    else {
      console.log("SCANNING");
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

  syncData = async (deviceID) => {
    let device = await this.manager.discoverAllServicesAndCharacteristicsForDevice(deviceID);
    let services = await device.services();
    let characteristics = await this.manager.characteristicsForDevice(deviceID, services[0].uuid);
    let battery = await device.readCharacteristicForService(services[0].uuid, characteristics[0].uuid);
    console.log(battery.value);
    this.manager.monitorCharacteristicForDevice(deviceID, services[0].uuid, characteristics[0].uuid, (error, data) => {
      if (error) console.log("error", error);
      else {
        console.log(data.value);
        this.manager.cancelTransaction("booty");
      }
    }, "booty");
  }

  connect = async (deviceID, callback, onDisconnect) => {
    if (fakeIt) {
      callback();
    }
    else {
      this.manager.stopDeviceScan();
      await this.manager.connectToDevice(deviceID);
      await this.manager.onDeviceDisconnected(deviceID, onDisconnect);
      callback();
    }
  }

  disconnect

}
