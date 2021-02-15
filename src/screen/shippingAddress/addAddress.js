/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Body,
  Button,
  Header,
  Left,
  Title,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import s from '../../styles/addressaddStyle';

import axios from 'axios';
import {connect} from 'react-redux';

import {getMyAddressAction} from '../../global/ActionCreators/address';
import AsyncStorage from '@react-native-community/async-storage';

import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: BASE_URL,
});

const addAddress = (props) => {
  const [addName, setaddName] = useState('');
  const [recName, setrecName] = useState('');
  const [street, setstreet] = useState('');
  const [city, setcity] = useState('');
  const [region, setregion] = useState('');
  const [postCode, setpostCode] = useState('');
  const [phone, setphone] = useState('');

  const newAddress = async () => {
    const token = await AsyncStorage.getItem('token');

    const data = {
      email: JSON.parse(token).email,
      name: addName,
      recip: recName,
      street: street,
      city: city,
      region: region,
      postcode: postCode,
      phone: phone,
    };

    api
      .post('profile/address', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(async () => {
        props.dispatch(getMyAddressAction({email: JSON.parse(token).email}));
        ToastAndroid.show('Successfully Save new Address');
        props.navigation.goBack();
      })
      .catch(() => {
        ToastAndroid.show('Failed Save new Address');
      });
  };

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
              width: '100%',
              textAlign: 'center',
              fontSize: 20,
              left: -40,
            }}>
            {'Adding Shipping Address'}
          </Title>
        </Body>
      </Header>
      <ScrollView>
        <Container style={s.formInput}>
          <Form>
            <Item floatingLabel style={s.inputBox}>
              <Label style={s.labelStyle} floatBack={3}>
                {"Shipping Name  (ex : 'Home', 'Office')"}
              </Label>
              <Input style={s.inputStyle} onChangeText={(e) => setaddName(e)} />
            </Item>

            <Item floatingLabel style={s.inputBox}>
              <Label style={s.labelStyle} floatBack={3}>
                Recipient’s name
              </Label>
              <Input style={s.inputStyle} onChangeText={(e) => setrecName(e)} />
            </Item>

            <Item floatingLabel style={s.inputBox}>
              <Label style={s.labelStyle} floatBack={3}>
                Address Street
              </Label>
              <Input style={s.inputStyle} onChangeText={(e) => setstreet(e)} />
            </Item>

            <Item floatingLabel style={s.inputBox}>
              <Label style={s.labelStyle} floatBack={3}>
                City or Subdistrict
              </Label>
              <Input style={s.inputStyle} onChangeText={(e) => setcity(e)} />
            </Item>

            <Item floatingLabel style={s.inputBox}>
              <Label style={s.labelStyle} floatBack={3}>
                Region or Province, State
              </Label>
              <Input style={s.inputStyle} onChangeText={(e) => setregion(e)} />
            </Item>

            <Item floatingLabel style={s.inputBox}>
              <Label style={s.labelStyle} floatBack={3}>
                {'Zip Code (Postal code)'}
              </Label>
              <Input
                keyboardType={'number-pad'}
                style={s.inputStyle}
                onChangeText={(e) => setpostCode(e)}
              />
            </Item>

            <Item floatingLabel style={s.inputBox}>
              <Label style={s.labelStyle} floatBack={3}>
                Recipient's telephone number
              </Label>
              <Input
                keyboardType={'phone-pad'}
                style={s.inputStyle}
                onChangeText={(e) => setphone(e)}
              />
            </Item>

            <View style={s.formAction}>
              <TouchableOpacity style={{width: '100%'}}>
                <Button
                  style={s.buttonStyle}
                  rounded
                  danger
                  block
                  onPress={() => {
                    addName === ''
                      ? ToastAndroid.show('Shipping Name not filled yet')
                      : recName === ''
                      ? ToastAndroid.show('Recipient’s name not filled yet')
                      : street === ''
                      ? ToastAndroid.show('Address Street not filled yet')
                      : city === ''
                      ? ToastAndroid.show('City or Subdistrict not filled yet')
                      : region === ''
                      ? ToastAndroid.show(
                          'Region or Province, State not filled yet',
                        )
                      : postCode === ''
                      ? ToastAndroid.show('Post Code not filled yet')
                      : phone === ''
                      ? ToastAndroid.show('Recipient’s Phone not filled yet')
                      : newAddress();
                  }}>
                  <Text style={s.whiteText}>SAVE ADDRESS</Text>
                </Button>
              </TouchableOpacity>
            </View>
          </Form>
        </Container>
      </ScrollView>
    </>
  );
};

export default connect()(addAddress);
