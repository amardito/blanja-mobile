import {StyleSheet} from 'react-native';

const addresschange = StyleSheet.create({
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
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },
  instructionText: {
    marginBottom: 16,
  },
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

export default addresschange;
