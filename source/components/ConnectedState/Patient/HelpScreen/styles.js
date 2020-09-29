import { Dimensions, StyleSheet } from 'react-native';

export const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  layout: {
    flex: 1
  },
  content: {
    backgroundColor: 'lightgray'
  },
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 15,
    borderRadius: 20,
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOffset: { width: 10, height: 15 },
    shadowOpacity: .1,
  },
  title: {
    color: 'rgb(70,100,140)',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10
  },
  text: {
    fontSize: 17,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  image: {
    width: 150,
    height: 150
  }
});
