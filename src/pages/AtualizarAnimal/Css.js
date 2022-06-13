import { StyleSheet } from 'react-native';
const css = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    paddingTop: 10,
    alignItems: 'center',
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
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export { css };
