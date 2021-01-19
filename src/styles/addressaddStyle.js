import {StyleSheet} from 'react-native';

const addressadd = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
  formInput: {
    height: 'auto',
    paddingHorizontal: 8,
    paddingBottom: 16,
    backgroundColor: '#ffffff00',
    marginTop: 20,
  },
  inputBox: {
    backgroundColor: '#ffffff',
    elevation: 6,
    borderRadius: 8,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 15,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
    bottom: 0,
    top: 0,
    height: 70,
  },
  instructionText: {
    marginBottom: 16,
  },
  labelStyle: {
    paddingHorizontal: 12,
    paddingTop: 15,
    marginBottom: 0,
    paddingBottom: 0,
  },
  inputStyle: {paddingVertical: 0, height: 'auto'},
  formAction: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 80,
  },
  buttonStyle: {
    elevation: 6,
  },
  whiteText: {
    color: '#fff',
  },
});

export default addressadd;
