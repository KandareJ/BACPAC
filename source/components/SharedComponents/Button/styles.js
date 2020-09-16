import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(70,100,140)',
    height: 45,
    width: '70%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#808080',
    shadowRadius: 7,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: .7
  },
  buttonPress: {
    opacity: .9
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});
