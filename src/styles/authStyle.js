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
    borderRadius: 9,
    paddingBottom: 12,
    marginBottom: 12,
  },
  inputStyle: {
    paddingBottom: 0,
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
