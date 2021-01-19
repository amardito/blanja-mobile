/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {Body, Button, Header, Left, Title} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardAddress from '../../components/card/cardAddress';
import {connect} from 'react-redux';

import s from '../../styles/addresslistStyle';

const listAddress = (props) => {
  const {data} = props.address;
  return (
    <>
      <Header style={s.header}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Left>
          <Button
            transparent
            onPress={() => {
              props.navigation.goBack();
            }}>
            <MaterialCommunityIcons
              name="chevron-left"
              color={'#555'}
              size={35}
            />
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              color: '#555',
              textAlign: 'center',
              width: '65%',
              fontSize: 20,
            }}>
            {'Shipping Address'}
          </Title>
        </Body>
      </Header>
      <Text style={s.title}>Shipping Address</Text>
      {data.length &&
        data.map(
          (
            {
              address_name,
              address_street,
              address_city,
              address_region,
              id_address,
            },
            index,
          ) => {
            return (
              <CardAddress
                key={index}
                index={index}
                id={id_address}
                name={address_name}
                street={address_street}
                city={address_city}
                region={address_region}
                deleteAct={true}
                {...props}
              />
            );
          },
        )}
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('newaddress');
        }}>
        <View style={s.button}>
          <Text>ADD NEW ADDRESS</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const mapStateToProps = ({address}) => {
  return {
    address,
  };
};

export default connect(mapStateToProps)(listAddress);
