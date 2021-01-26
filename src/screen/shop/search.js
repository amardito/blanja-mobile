/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Search = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  //console.log(keyword);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{alignSelf: 'center', marginRight: 20}}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            color={'#555'}
            size={35}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          style={styles.searchBar}
          defaultValue={keyword}
          onChangeText={(text) => setKeyword(text)}
          onSubmitEditing={() =>
            navigation.navigate('catalog', {
              title: keyword,
              search: keyword,
            })
          }
        />
      </View>
    </View>
  );
};

export default Search;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
    marginTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    fontSize: 15,
    margin: 5,
    width: '85%',
    height: 40,
    backgroundColor: 'white',
    marginLeft: 5,
    borderRadius: 23,
    paddingLeft: 15,
  },
});
