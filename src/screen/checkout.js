/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StatusBar, TouchableOpacity, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Body, Button, Header, Left, Title} from 'native-base';
import CardAddress from '../components/card/cardAddress';
import alasql from 'alasql';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import CardPayment from '../components/card/cardPayment';
import axios from 'axios';
import {getMyBagAction} from '../global/ActionCreators/bag';
import {clearCheckoutAction} from '../global/ActionCreators/checkout';

import s from '../styles/checkoutStyle';

const api = axios.create({
  baseURL: 'http://192.168.1.7:1010/api/v1/',
});

export class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      payment: null,
    };
  }
  submitOrder = async () => {
    const {id_address} = this.props.checkout.address;
    const token = await AsyncStorage.getItem('token');
    const payload = [];
    const prevData = this.props.bag.data;
    let newData = [];
    await this.props.checkout.data.map(
      ({product_id, color, size, qty, price}) => {
        return payload.push({
          user_email: JSON.parse(token).email,
          product_id: product_id,
          color: color,
          size: size,
          qty: qty,
          price: price,
          address_id: id_address,
          payment: this.state.payment,
        });
      },
    );

    const arrcheckout = [];

    this.props.checkout.data
      .sort((a, b) => a.indexof - b.indexof)
      .map(({indexof}) => arrcheckout.push(indexof));

    prevData.filter((item, index) => {
      !arrcheckout.includes(index) && newData.push(item);
    });
    api
      .post('order', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        Alert.alert(
          'Success Submit Order',
          null,
          [
            {
              text: 'OK',
              onPress: async () => {
                await AsyncStorage.setItem(
                  'belanjaUser',
                  JSON.stringify(newData),
                );
                await this.props.dispatch(getMyBagAction());
                await this.props.dispatch(clearCheckoutAction());
                this.props.navigation.navigate('mybag');
              },
            },
          ],
          {cancelable: false},
        );
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(
          'Failed to Submit',
          'Internal Server Error',
          [
            {
              text: 'Ok',
            },
          ],
          {cancelable: false},
        );
      });
  };
  render() {
    const {
      address_name,
      address_street,
      address_city,
      address_region,
      id_address,
      index,
    } = this.props.checkout.address;
    const total =
      this.props.checkout.data[0] !== undefined
        ? alasql(
            'SELECT SUM(CAST([price] AS INT)) AS [price] \
          FROM ? ',
            [this.props.checkout.data],
          )[0].price
        : 0;

    let {payment} = this.state;
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
                this.props.navigation.goBack();
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
              {'Checkout'}
            </Title>
          </Body>
        </Header>
        <View style={{margin: 16}}>
          <Text style={{fontSize: 20, fontWeight: '600'}}>
            Shipping address
          </Text>
        </View>
        {this.props.checkout.address.id_address ? (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('selectaddress');
            }}>
            <CardAddress
              index={index}
              id={id_address}
              name={address_name}
              street={address_street}
              city={address_city}
              region={address_region}
              {...this.props}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: '100%',
              paddingHorizontal: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('selectaddress');
              }}
              style={{
                backgroundColor: '#fff',
                paddingVertical: 15,
                borderWidth: 2,
                borderColor: 'lightgray',
                borderRadius: 50,
                elevation: 10,
              }}>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                Select Shipping Address
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{margin: 16}}>
          <Text style={{fontSize: 16}}>Payment</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              payment: 1,
            });
          }}>
          <CardPayment
            image="Mastercard"
            selected={payment === 1 ? true : false}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.setState({
              payment: 2,
            });
          }}>
          <CardPayment
            image="Pos Indonesia"
            selected={payment === 2 ? true : false}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.setState({
              payment: 3,
            });
          }}>
          <CardPayment image="Gopay" selected={payment === 3 ? true : false} />
        </TouchableOpacity>
        <View style={s.addcart}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              marginHorizontal: 10,
              marginVertical: 20,
            }}>
            <Text style={{color: 'gray'}}>Total amount:</Text>
            <Text>
              IDR{' '}
              {Number(total)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              id_address === undefined
                ? Alert.alert(
                    'Failed to Submit Order',
                    'Shipping Address not filled yet',
                    ['Ok'],
                  )
                : payment === null
                ? Alert.alert(
                    'Failed to Submit Order',
                    'Payment not filled yet',
                    ['Ok'],
                  )
                : this.submitOrder();
              // navigation.navigate('Success');
            }}>
            <View style={s.btn}>
              <Text style={{color: '#fff'}}>SUBMIT ORDER</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const mapStateToProps = ({checkout, address, bag}) => {
  return {
    checkout,
    address,
    bag,
  };
};

export default connect(mapStateToProps)(Checkout);
