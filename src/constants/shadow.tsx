import {StyleSheet, Platform} from 'react-native';
export const shadowStyle = StyleSheet.create({
  shadowContainer: {
    ...Platform.select({
      ios: {
        shadowColor: '#003A9B33',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
