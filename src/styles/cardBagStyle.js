import {StyleSheet} from 'react-native';

const cardBagStyle = StyleSheet.create({
  cardBag: {
    width: '100%',
    height: 104,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 6,
    marginBottom: 25,
  },
  img: {
    width: 104,
    height: 104,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  dtlZiseCol: {
    flexDirection: 'row',
    width: 125,
    justifyContent: 'space-between',
    marginTop: 4,
  },
});

export default cardBagStyle;
