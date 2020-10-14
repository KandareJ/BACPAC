import AsyncStorage from '@react-native-community/async-storage';

export const saveSync = async () => {
  let time = Date.now();
  await AsyncStorage.setItem(`lastSync`, JSON.stringify(time));
  return time;
}

export const getSync = async () => {
  return JSON.parse(await AsyncStorage.getItem(`lastSync`));
}

export const clearSync = async () => {
  return AsyncStorage.removeItem(`lastSync`);
}

export const saveProfile = async (profile) => {
  await AsyncStorage.setItem(`profile`, JSON.stringify(profile));
  return 0;
}

export const getProfile = async () => {
  let profile = await AsyncStorage.getItem(`profile`);
  return JSON.parse(profile);
}
