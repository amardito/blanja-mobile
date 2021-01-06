import {StyleSheet} from 'react-native';

const authStyle = StyleSheet.create({
  containerFull: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 13,
    paddingRight: 13,
  },
  headerText: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 45,
  },
  formInput: {
    height: 'auto',
    paddingHorizontal: 8,
    paddingBottom: 16,
    backgroundColor: '#ffffff00',
  },
  inputBox: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  whiteText: {
    color: '#fff',
  },
});

export default authStyle;
