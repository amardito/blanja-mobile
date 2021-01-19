import {StyleSheet} from 'react-native';

const detailStyle = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
  titleScreen: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  cardList: {
    marginTop: 24,
  },
  addcart: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    width: '100%',
  },
  btn: {
    backgroundColor: '#DB3022',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 10,
  },
});

export default detailStyle;
