import {StyleSheet} from 'react-native';

const cardGridStyle = StyleSheet.create({
  items: {
    width: 180,
    marginLeft: 15,
    marginBottom: 15,
  },
  itemsHeader: {
    position: 'relative',
    width: '100%',
    height: 220,
    overflow: 'hidden',
    borderRadius: 12,
  },
  itemsImage: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#555',
  },
  itemsTextBadge: {
    marginTop: 15,
    marginLeft: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#222222c0',
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    width: 47,
    borderRadius: 15,
  },
  starsItems: {
    // backgroundColor: '#ddd',
    // height: 20,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
  },
  itemsOwner: {
    fontSize: 14,
    fontWeight: '400',
    color: '#888',
  },
  itemsName: {
    fontSize: 16,
    fontWeight: '600',
    height: 43,
  },
  itemsPrice: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default cardGridStyle;
