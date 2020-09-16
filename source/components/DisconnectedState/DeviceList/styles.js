import { Dimensions, StyleSheet } from 'react-native';

export const height = Dimensions.get('window').height / 3;
export const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  scrollListStyle: {
    height: height - 20
  },
  device: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  devicePressed: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 30,
    backgroundColor: 'gray',
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  deviceName: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  deviceID: {
    fontSize: 10,
  }
});
