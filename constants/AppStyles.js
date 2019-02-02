import { StyleSheet } from 'react-native';

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 5,
    backgroundColor: 'darkslategrey',
  },
  mascotContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mascot: {
    width: 100,
    height: 100,
  },
  mascotLarge: {
    width: 200,
    height: 200,
  },
  normalText: {
    fontFamily: 'zcool',
    fontSize: 18,
    color: 'white',
    lineHeight: 30,
  },
});
