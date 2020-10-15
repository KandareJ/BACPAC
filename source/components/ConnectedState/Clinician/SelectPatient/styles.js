import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  name: {
    height: 75,
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: .4,
  },
  nameText: {
    fontSize: 20
  },
  addIconText: {
    fontSize: 50,
    color: 'gray'
  },
  addIcon: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "white",
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: .4,
  }
});
