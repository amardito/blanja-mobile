/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const cardPayment = ({image, selected}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.wrapicon}>
          {image === 'Mastercard' && (
            <Image source={require('../../assets/mastercard.png')} />
          )}
          {image === 'Pos Indonesia' && (
            <Image source={require('../../assets/posIndonesia.png')} />
          )}
          {image === 'Gopay' && (
            <Image source={require('../../assets/Gopay.png')} />
          )}
        </View>
        <Text style={{marginLeft: 20, fontSize: 18}}>{image}</Text>
      </View>
      {selected ? (
        <MaterialCommunityIcons
          name="checkbox-marked"
          color={'#DB3022'}
          size={35}
        />
      ) : (
        <MaterialCommunityIcons
          name="checkbox-blank-outline"
          color={'#555'}
          size={35}
        />
      )}
    </View>
  );
};

export default cardPayment;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: windowWidth * 0.04,
    marginBottom: 22,
  },
  wrapicon: {
    width: 64,
    height: 38,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
