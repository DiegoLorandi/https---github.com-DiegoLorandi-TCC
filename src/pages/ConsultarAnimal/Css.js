import { StyleSheet } from 'react-native';
const css = StyleSheet.create({
  container: {
    flex: 1,
    margin: 35,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  input: {
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    padding: 5,
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  searched: {},
  noSearched: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
  },
  button: {
    backgroundColor: '#33eeff',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  },
});

export { css };
