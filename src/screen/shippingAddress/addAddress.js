/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
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

const api = axios.create({
  baseURL: 'http://192.168.1.15:1010/api/v1/',
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
        Alert.alert(
          'Success Save New Address',
          null,
          [
            {
              text: 'OK',
              onPress: () => props.navigation.goBack(),
            },
          ],
          {cancelable: false},
        );
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(
          'Failed Edit',
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
                style={s.inputStyle}
                onChangeText={(e) => setpostCode(e)}
              />
            </Item>

            <Item floatingLabel style={s.inputBox}>
              <Label style={s.labelStyle} floatBack={3}>
                Recipient's telephone number
              </Label>
              <Input style={s.inputStyle} onChangeText={(e) => setphone(e)} />
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
                      ? Alert.alert(
                          'Failed to save',
                          'Shipping Name not filled yet',
                          ['Ok'],
                        )
                      : recName === ''
                      ? Alert.alert(
                          'Failed to save',
                          'Recipient’s name not filled yet',
                          ['Ok'],
                        )
                      : street === ''
                      ? Alert.alert(
                          'Failed to save',
                          'Address Street not filled yet',
                          ['Ok'],
                        )
                      : city === ''
                      ? Alert.alert(
                          'Failed to save',
                          'City or Subdistrict not filled yet',
                          ['Ok'],
                        )
                      : region === ''
                      ? Alert.alert(
                          'Failed to save',
                          'Region or Province, State not filled yet',
                          ['Ok'],
                        )
                      : postCode === ''
                      ? Alert.alert(
                          'Failed to save',
                          'Post Code not filled yet',
                          ['Ok'],
                        )
                      : phone === ''
                      ? Alert.alert(
                          'Failed to save',
                          'Recipient’s Phone not filled yet',
                          ['Ok'],
                        )
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
