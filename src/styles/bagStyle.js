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
  cardBag: {
    height: 104,
    borderRadius: 8,
    position: 'relative',
  },
  img: {
    width: 104,
    height: 104,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  dtlZiseCol: {
    flexDirection: 'row',
    width: 110,
    justifyContent: 'space-between',
    marginTop: 4,
  },
});

export default detailStyle;
