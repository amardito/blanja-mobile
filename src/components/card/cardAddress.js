/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';

import s from '../../styles/cardAddressStyle';

import axios from 'axios';
import {connect} from 'react-redux';
import {getMyAddressAction} from '../../global/ActionCreators/address';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.1.6:1010/api/v1/',
});

const cardAddress = (props) => {
  const {name, street, city, region, index, address, id, deleteAct} = props;
  const deleteAddress = () => {
    api
      .delete(`profile/address/${id}`)
      .then(async () => {
        const token = await AsyncStorage.getItem('token');
        props.dispatch(
          getMyAddressAction({
            email: JSON.parse(token).email,
          }),
        );
        Alert.alert('Success Delete', null, [
          {
            text: 'Ok',
          },
        ]);
      })
      .catch(() => {
        Alert.alert(
          'Failed Delete',
          null,
          [
            {
              text: 'Ok',
            },
          ],
          {cancelable: false},
        );
      });
  };
  return (
    <View style={s.cardAddress}>
      <View style={s.name}>
        <Text style={{fontSize: 18}}>{name}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginRight: deleteAct ? 15 : 0}}
            onPress={() => {
              props.navigation.navigate('changeaddress', {
                addressData: address.data[index],
              });
            }}>
            <Text
              style={{
                color: '#DB3022',
                fontSize: 16,
                paddingVertical: 10,
                paddingHorizontal: 5,
              }}>
              Change
            </Text>
          </TouchableOpacity>
          {deleteAct && (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Warning !!',
                  'Are you sure want delete this address?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        deleteAddress();
                      },
                    },
                    {
                      text: 'No',
                    },
                  ],
                );
              }}>
              <Text
                style={{
                  color: '#DB3022',
                  fontSize: 16,
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View>
        <Text>
          {street},{` ${city}`},{` ${region}`}
        </Text>
      </View>
    </View>
  );
};

export default connect()(cardAddress);
