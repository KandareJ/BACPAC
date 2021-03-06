import { combineReducers } from 'redux';
import { ADD_DEVICE, FINISH_CONNECTING, REMOVE_DEVICE, CREATE_BLE_PROXY } from '../actions';
import BLEProxy from '../logic/BLEProxy';

export const addedDeviceReducer = (last = null, action) => {
  if (action.type === ADD_DEVICE) {
    return action.payload
  }
  else if (action.type === REMOVE_DEVICE) {
    return null;
  }
  else return last;
};

export const finishConnectingReducer = (last = true, action) => {
  if (action.type === FINISH_CONNECTING) return false;
  else if (action.type === REMOVE_DEVICE) {
    return true;
  }
  else return last;
}

export const createBLEProxyReducer = (last = null, action) => {
  if (action.type === CREATE_BLE_PROXY && last === null) {
    return new BLEProxy();
  }
  else return last;
}

export default combineReducers({
  addedDevice: addedDeviceReducer,
  connecting: finishConnectingReducer,
  BLE: createBLEProxyReducer
});
