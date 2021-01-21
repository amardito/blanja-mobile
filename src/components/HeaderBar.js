/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NavBar = ({title, navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="chevron-left" color={'#555'} size={35} />
      </TouchableOpacity>
      <View style={{alignSelf: 'center'}}>
        <Text style={{fontSize: 18}}>{title}</Text>
      </View>
      <View style={{alignSelf: 'center', marginLeft: 35, marginRight: 5}}>
        <MaterialCommunityIcons
          name="magnify"
          color={'#555'}
          size={30}
          onPress={() => navigation.navigate('Search')}
        />
      </View>

      <View style={{display: 'none'}}>
        <TextInput placeholder="Search" style={styles.searchBar} />
      </View>
    </View>
  );
};

export default NavBar;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: windowWidth * 0.04,
    height: 50,
    marginTop: 30,
  },
  searchBar: {
    fontSize: 15,
    margin: 5,
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    marginLeft: 5,
  },
});
