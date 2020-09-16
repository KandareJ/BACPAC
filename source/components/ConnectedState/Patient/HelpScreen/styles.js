import { Dimensions, StyleSheet } from 'react-native';

export const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  section: {
    marginTop: 25
  },
  layout: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingHorizontal: 20
  },
  center: {
    marginTop: 10,
    alignItems: 'center'
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20
  },
  text: {
    fontWeight: 'normal',
    fontSize: 20
  }
});
