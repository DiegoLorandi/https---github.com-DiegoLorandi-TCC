import { StyleSheet } from 'react-native';
const css = StyleSheet.create({
  container: {
    flex: 1,
    margin: 35,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#4682B4',
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    padding: 5,
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  button: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 5,
    marginBottom: 10,
  },
  maskInput: {
    marginBottom: 10,
  },
});

export { css };
