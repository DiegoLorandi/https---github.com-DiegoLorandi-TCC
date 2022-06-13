import { StyleSheet } from 'react-native';
const css = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 5,
  },
  vertical: {},
  optContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outLineCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#777',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
  txt: {
    fontSize: 14,
    marginLeft: 7,
  },
});

export { css };
