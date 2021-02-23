/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Body, Button, Header, Left, Title} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardAddress from '../../components/card/cardAddress';
import {connect} from 'react-redux';

import {
  getCheckoutAddressAction,
  deleteCheckoutAddressAction,
} from '../../global/ActionCreators/checkout';

import s from '../../styles/addresslistStyle';

const selectAddress = (props) => {
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
      <ScrollView>
        <Text style={s.title}>Shipping Address</Text>
        {data.length ? (
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
                <TouchableOpacity
                  key={index}
                  onPress={async () => {
                    await props.dispatch(deleteCheckoutAddressAction());
                    await props.dispatch(
                      getCheckoutAddressAction({
                        index: index,
                        id_address: id_address,
                        address_name: address_name,
                        address_street: address_street,
                        address_city: address_city,
                        address_region: address_region,
                      }),
                    );
                    props.navigation.goBack();
                  }}>
                  <CardAddress
                    index={index}
                    id={id_address}
                    name={address_name}
                    street={address_street}
                    city={address_city}
                    region={address_region}
                    {...props}
                  />
                </TouchableOpacity>
              );
            },
          )
        ) : (
          <View style={{paddingTop: 5, paddingLeft: 20}}>
            <Text style={{fontSize: 15, color: 'dimgray'}}>
              You don't have a shipping address
            </Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          elevation: 20,
          zIndex: 1,
          bottom: 0,
          backgroundColor: '#fa',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
            props.navigation.navigate('newaddress');
          }}>
          <View style={s.button}>
            <Text>ADD NEW ADDRESS</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const mapStateToProps = ({address}) => {
  return {
    address,
  };
};

export default connect(mapStateToProps)(selectAddress);
