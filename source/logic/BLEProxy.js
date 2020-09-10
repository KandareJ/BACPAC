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

  async scan(callback) {
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
  }

  connect(deviceID, callback) {
    if (fakeIt) {
      callback();
    }
    else {
      this.manager.stopDeviceScan();
      this.manager.connectToDevice(deviceID).then((resp) => {
        callback();
      });
    }
  }

}
