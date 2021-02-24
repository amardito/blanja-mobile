/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {getSingleProductAction} from '../../global/ActionCreators/product';

const CardCatalog = ({
  name,
  brand,
  price,
  image,
  itemId,
  category,
  navigation,
  dispatch,
}) => {
  //console.log(image[0]);
  const imgs = {uri: `http://34.203.227.174:8000/${image}`};
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log(`\n
        getting item of id : ${String(itemId)} ...
        \n`);
        dispatch(getSingleProductAction(String(itemId)));
        navigation.navigate('detail', {category: category});
      }}>
      <Image source={imgs} style={styles.img} />
      <View style={styles.infobag}>
        <Text>{name}</Text>
        <Text>{brand}</Text>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name="star-outline"
            color={'#888'}
            size={18}
          />
          <MaterialCommunityIcons
            name="star-outline"
            color={'#888'}
            size={18}
          />
          <MaterialCommunityIcons
            name="star-outline"
            color={'#888'}
            size={18}
          />
          <MaterialCommunityIcons
            name="star-outline"
            color={'#888'}
            size={18}
          />
          <MaterialCommunityIcons
            name="star-outline"
            color={'#888'}
            size={18}
          />
        </View>
        <Text>Rp.{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default connect()(CardCatalog);

// const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '95%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderRadius: 8,
    overflow: 'hidden',
  },
  img: {
    width: 104,
    height: 104,
  },
  infobag: {
    paddingHorizontal: 5,
    width: 220,
  },
});
