import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    alignItems: 'center'
  },
  scroll: {
    width: '95%'
  },
  result: {
    backgroundColor: 'white',
    height: 60,
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 15,
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: .3,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  resultText: {
    fontSize: 20
  },
  open: {
    fontSize: 25,
    fontWeight: '100'
  }
});
