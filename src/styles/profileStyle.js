import {StyleSheet} from 'react-native';

const profileStyle = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
  textHeader: {
    marginTop: 16,
    paddingLeft: 16,
    fontSize: 40,
    fontWeight: '700',
  },
  profile: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  line: {
    borderWidth: 1,
    borderColor: 'grey',
    width: 1000,
    left: -16,
    marginTop: 17,
  },
  accordian: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default profileStyle;
