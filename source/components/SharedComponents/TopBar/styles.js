import { Dimensions, StyleSheet } from 'react-native';

export const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  screenView: {
    width: '100%',
    flex: 1
  },
  topSection: {
    backgroundColor: 'rgb(70,100,140)',
  },
  bottomSection: {
    backgroundColor:  null,
  },
  bar: {
    width,
    height: 60,
    backgroundColor: 'rgb(70,100,140)',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: .3,
    zIndex: 1
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25
  },
  image: {
    width: 23,
    height: 23
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sideSpace: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerSpace: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  children: {
    flex: 1
  },
  iconText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500'
  }
});
