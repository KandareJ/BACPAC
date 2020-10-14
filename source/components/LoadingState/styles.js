import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  bgView: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  gif: {
    width,
    height: width,
    marginBottom: 60
  }
});
