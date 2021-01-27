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
import axios from 'axios';
import {connect} from 'react-redux';

import s from '../../styles/addresschangeStyle';

import {getMyAddressAction} from '../../global/ActionCreators/address';
import AsyncStorage from '@react-native-community/async-storage';

import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: BASE_URL,
});

const changeAddress = (props) => {
  const {addressData} = props.route.params;

  const {
    id_address,
    address_name,
    recip_name,
    address_street,
    address_city,
    address_region,
    address_postcode,
    recip_phone,
  } = addressData;

  const [addName, setaddName] = useState(address_name);
  const [recName, setrecName] = useState(recip_name);
  const [street, setstreet] = useState(address_street);
  const [city, setcity] = useState(address_city);
  const [region, setregion] = useState(address_region);
  const [postCode, setpostCode] = useState(address_postcode);
  const [phone, setphone] = useState(recip_phone);

  const handleUpdate = async () => {
    const data = {
      address_name: addName,
      recip_name: recName,
      address_street: street,
      address_city: city,
      address_region: region,
      address_postcode: postCode,
      recip_phone: phone,
    };
    api
      .put(`profile/address/${id_address}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(async () => {
        const token = await AsyncStorage.getItem('token');
        props.dispatch(getMyAddressAction({email: JSON.parse(token).email}));
        Alert.alert(
          'Success Edit',
          null,
          [
            {
              text: 'Back',
              onPress: () => props.navigation.goBack(),
            },
            {text: 'Edit again'},
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
              textAlign: 'center',
              width: '65%',
              fontSize: 20,
            }}>
            {'Change Address'}
          </Title>
        </Body>
      </Header>
      <ScrollView>
        <Container style={s.formInput}>
          <Form>
            <View style={s.inputBox}>
              <Item stackedLabel style={{paddingBottom: 0}}>
                <Label style={{paddingBottom: 0, fontSize: 14}}>
                  {'Save address as (ex : home address, office address)'}
                </Label>
                <Input
                  placeholder={address_name}
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    bottom: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                  onChangeText={(e) => {
                    setaddName(e);
                  }}
                />
              </Item>

              <Item stackedLabel style={{paddingBottom: 0}}>
                <Label style={{paddingBottom: 0, fontSize: 14}}>
                  Recipient’s name
                </Label>
                <Input
                  placeholder={recip_name}
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    bottom: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                  onChangeText={(e) => {
                    setrecName(e);
                  }}
                />
              </Item>
            </View>

            <View style={s.inputBox}>
              <Item stackedLabel style={{paddingBottom: 0}}>
                <Label style={{paddingBottom: 0, fontSize: 14}}>Address</Label>
                <Input
                  placeholder={address_street}
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    bottom: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                  onChangeText={(e) => {
                    setstreet(e);
                  }}
                />
              </Item>

              <Item stackedLabel style={{paddingBottom: 0}}>
                <Label style={{paddingBottom: 0, fontSize: 14}}>
                  City or Subdistrict
                </Label>
                <Input
                  placeholder={address_city}
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    bottom: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                  onChangeText={(e) => {
                    setcity(e);
                  }}
                />
              </Item>

              <Item stackedLabel style={{paddingBottom: 0}}>
                <Label style={{paddingBottom: 0, fontSize: 14}}>
                  Region or Province, State
                </Label>
                <Input
                  placeholder={address_region}
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    bottom: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                  onChangeText={(e) => {
                    setregion(e);
                  }}
                />
              </Item>

              <Item stackedLabel style={{paddingBottom: 0}}>
                <Label style={{paddingBottom: 0, fontSize: 14}}>
                  Postal code
                </Label>
                <Input
                  placeholder={String(address_postcode)}
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    bottom: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                  onChangeText={(e) => {
                    setpostCode(e);
                  }}
                />
              </Item>
            </View>

            <View style={s.inputBox}>
              <Item stackedLabel style={{paddingBottom: 0}}>
                <Label style={{paddingBottom: 0, fontSize: 14}}>
                  recipient's telephone number
                </Label>
                <Input
                  placeholder={String(recip_phone)}
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                    bottom: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                  onChangeText={(e) => {
                    setphone(e);
                  }}
                />
              </Item>
            </View>

            <View style={s.formAction}>
              <TouchableOpacity style={{width: '100%'}}>
                <Button
                  style={s.buttonStyle}
                  rounded
                  danger
                  block
                  onPress={() => {
                    handleUpdate();
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

export default connect()(changeAddress);
