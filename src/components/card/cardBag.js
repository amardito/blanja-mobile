/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import s from '../../styles/cardBagStyle';

export default class cardBag extends Component {
  render() {
    const {
      product_name,
      product_img,
      size,
      color,
      item_qty,
      product_price,
    } = this.props;
    return (
      <View style={s.cardBag}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Image
            style={s.img}
            source={{
              uri: `http://192.168.1.9:1010${product_img}`,
            }}
          />
          <View style={{width: '67%', marginTop: 5}}>
            <Text style={{fontSize: 13, paddingRight: 10}}>{product_name}</Text>
            <View style={s.dtlZiseCol}>
              <Text style={{fontSize: 11}}>Color : {color}</Text>
              <Text style={{fontSize: 11}}>Size : {size}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 111,
                  height: 36,
                  marginTop: 5,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 36,
                      width: 36,
                      borderRadius: 18,
                      borderColor: 'black',
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 30, marginTop: -5}}>-</Text>
                  </View>
                </TouchableOpacity>
                <Text>{item_qty}</Text>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 36,
                      width: 36,
                      borderRadius: 18,
                      borderColor: 'black',
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: 30, marginTop: -5}}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '45%',
                  paddingHorizontal: 10,
                  alignItems: 'flex-end',
                }}>
                <Text>
                  IDR{' '}
                  {Number(product_price)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') === 'NaN'
                    ? 0
                    : Number(product_price)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
