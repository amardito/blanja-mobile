/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import s from '../../styles/cardAddressStyle';

import axios from 'axios';
import {connect} from 'react-redux';
import {getMyAddressAction} from '../../global/ActionCreators/address';
import AsyncStorage from '@react-native-community/async-storage';

import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: BASE_URL,
});

const cardAddress = (props) => {
  const {
    name,
    street,
    city,
    region,
    index,
    address,
    id,
    deleteAct,
    isModal,
    confModal,
  } = props;
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
      })
      .catch(() => {
        // err
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
              onPress={async () => {
                await confModal({
                  titleModal: 'Delete Address',
                  descModal: 'Are you sure want delete this address?',
                  actBgModal: () => {
                    isModal(false);
                  },
                  act1Modal: {
                    text: 'yes',
                    onpress: () => {
                      deleteAddress();
                      isModal(false);
                    },
                  },
                  act2Modal: {
                    text: 'no',
                    onpress: () => {
                      isModal(false);
                    },
                  },
                  act3Modal: false,
                });
                isModal(true);
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
