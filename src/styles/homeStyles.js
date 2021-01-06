import {StyleSheet} from 'react-native';

const homeStyle = StyleSheet.create({
  headerHome: {
    position: 'relative',
    width: '100%',
    height: 230,
    display: 'flex',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  imageHeader: {
    position: 'absolute',
    zIndex: -1,
    top: -20,
    left: 0,
    right: 0,
    width: '100%',
    height: 300,
  },
  textHeader: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
    paddingLeft: 10,
    paddingVertical: 15,
  },
  headerContent: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  textSubHeader: {
    fontSize: 34,
    fontWeight: '700',
    color: '#333',
  },
  textSpan: {
    fontSize: 13,
    color: '#777',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default homeStyle;
