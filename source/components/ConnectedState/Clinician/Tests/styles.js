import { StyleSheet, Dimensions } from 'react-native';
export const { width } = Dimensions.get('window');
const margin = 20;

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#e3e3e3',
    alignItems: 'center'
  },
  scroll: {
    flex: 1,
    width: '100%'
  },
  selector: {
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
    borderRadius: 20,
    height: 80,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: .4,
    marginHorizontal: margin,
    alignItems: 'center',
    flexDirection: 'row'
  },
  selectorText: {
    fontSize: 25,
    fontWeight: '400'
  },
  selectorTextWrapper: {
    marginLeft: 20,
    flex: 1
  },
  selectorSubtext: {
    fontSize: 14,
    fontWeight: '200'
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20
  }
});
