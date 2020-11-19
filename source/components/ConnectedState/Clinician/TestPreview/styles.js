import { Dimensions, StyleSheet } from 'react-native';

export const { height, width } = Dimensions.get('window')

const aspectRatio = 3/4;

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
   video: {
     width: width*.95,
     height: width*.95*aspectRatio,
   },
   button: {
     width: '100%',
     alignItems: 'center',
     marginTop:100,
     marginBottom: 30
   },
   plainButton: {
     fontSize: 2
   }
});
