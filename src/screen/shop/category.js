/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ListCategory from '../../components/ListCategory';
import NavBar from '../../components/HeaderBar';

const Shop = ({navigation}) => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    // code to run on component mount
    getCategory();
  }, []);
  const getCategory = () => {
    axios
      .get('http://52.205.93.228:8000/api/v1/category')
      .then(({data}) => {
        //console.log(data.data);
        setCategory(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <NavBar title="Categories" navigation={navigation} />
      <TouchableOpacity
        style={styles.viewAll}
        onPress={() =>
          navigation.navigate('catalog', {
            title: 'View All Items',
          })
        }>
        <Text style={{color: '#ffffff'}}>VIEW ALL ITEMS</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Choose category</Text>
      <ScrollView vertical={true}>
        {category.length !== 0 &&
          category.map(({id_category, category_name}, index) => {
            return (
              <ListCategory
                key={id_category}
                title={category_name}
                keyword={index + 1}
                navigation={navigation}
              />
            );
          })}
        <View style={{borderTopColor: 'gray', borderTopWidth: 1}} />
        <View style={styles.gap} />
      </ScrollView>
    </View>
  );
};

export default Shop;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {},
  viewAll: {
    marginTop: 16,
    backgroundColor: '#DB3022',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: 48,
    marginHorizontal: windowWidth * 0.04,
  },
  text: {
    color: 'gray',
    fontSize: 14,
    marginVertical: 16,
    marginHorizontal: windowWidth * 0.04,
  },
  gap: {
    height: 170,
  },
});
