import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ListCategory = ({title, navigation, keyword}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('catalog', {title: title, category: keyword})
      }>
      <View style={styles.ListBar}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListCategory;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {},
  ListBar: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingVertical: 15,
  },
  text: {
    fontSize: 16,
    marginHorizontal: windowWidth * 0.04,
  },
});
