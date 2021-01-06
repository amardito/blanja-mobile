import {StyleSheet} from 'react-native';

const detailStyle = StyleSheet.create({
  header: {
    marginTop: 25,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
  imageItems: {
    width: 280,
    overflow: 'hidden',
    height: 400,
    position: 'relative',
    paddingRight: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: '#999',
  },
  listItems: {
    marginTop: 16,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lastItems: {
    marginRight: 15,
  },
  lastContent: {
    marginBottom: 20,
  },
});

export default detailStyle;
