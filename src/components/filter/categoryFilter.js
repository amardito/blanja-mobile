/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CategoryFilter = ({category, selected}) => {
  return (
    <View
      style={{
        ...styles.wrap,
        backgroundColor: selected ? '#DB3022' : '#fff',
        borderColor: selected ? '#DB3022' : 'dimgray',
      }}>
      <Text style={{alignSelf: 'center', color: selected ? '#fff' : '#000'}}>
        {category}
      </Text>
    </View>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    padding: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'dimgray',
    borderRadius: 3,
  },
});
