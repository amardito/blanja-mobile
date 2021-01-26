/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const cardOrder = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'http://192.168.1.15:1010' + props.img,
          width: 104,
          height: 120,
        }}
      />
      <View style={styles.infobag}>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 5,
            marginTop: 5,
          }}>
          {props.name}
        </Text>
        <Text style={{color: 'gray', marginBottom: 10}}>{props.by}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginRight: 16, color: 'gray'}}>
            Color:
            <Text style={{color: 'black'}}>{props.color}</Text>
          </Text>
          <Text>Size: {props.size}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'gray'}}>
            Unit :<Text style={{color: 'black'}}>{props.qty}</Text>
          </Text>
          <View style={styles.price}>
            <Text
              style={{
                fontFamily: 'Metropolis-Bold',
                fontSize: 20,
              }}>
              Rp. {props.qty * props.price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default cardOrder;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 120,
    marginBottom: 20,
    marginHorizontal: 15,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 10,
  },
  price: {
    marginTop: 7,
    marginLeft: 50,
  },
  img: {
    width: 104,
    height: 120,
  },
  infobag: {
    backgroundColor: '#fff',
    width: '75%',
    paddingHorizontal: 10,
    paddingRight: 20,
  },
});
