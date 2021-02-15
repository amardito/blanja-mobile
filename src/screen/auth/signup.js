/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {Container, Form, Item, Input, Label, Button} from 'native-base';
import axios from 'axios';

import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: BASE_URL,
});

import s from '../../styles/authStyle';

export default class signup extends Component {
  constructor() {
    super();
    this.state = {
      level: 1,
      username: '',
      email: '',
      store: '',
      phone: '',
      password: '',
      errMsg: '',
    };
  }

  hanldeSignUp = async () => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]/;
    if (this.state.email === '') {
      this.setState({errMsg: 'Fill your email first'});
    } else if (!this.state.email.match(mailformat)) {
      this.setState({errMsg: "Invalid email format ['@', '.', 'domain']"});
    } else if (this.state.password === '') {
      this.setState({errMsg: 'Fill your password first'});
    } else {
      const payload =
        this.state.level === 2
          ? JSON.stringify({
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
              level: this.state.level,
              store: this.state.store,
              phone: this.state.phone,
            })
          : JSON.stringify({
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
              level: this.state.level,
            });

      console.log(`\n
      Creating user data...
      `);

      await api
        .post('auth/register', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(async () => {
          ToastAndroid.show('Successfully Register');

          this.props.navigation.navigate('signin');
        })
        .catch((e) => {
          if (e.response.data.error === 'email already exists') {
            this.setState({
              email: '',
              errMsg: 'email already exists',
            });
          }
          if (e.response.data.message === 'Conflict Data') {
            this.setState({
              store: '',
              errMsg: 'Store name already taken',
            });
          }
        });
    }
  };
  render() {
    return (
      <View style={s.containerFull}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={s.headerText}> Sign Up </Text>
            <View
              style={{
                width: '40%',
                overflow: 'hidden',
                borderRadius: 6,
                borderWidth: 2,
                borderColor: '#DB3022',
                flexDirection: 'row',
                marginRight: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    level: 1,
                  });
                }}
                style={{
                  width: '56%',
                  backgroundColor: this.state.level === 1 ? '#DB3022' : '#fff',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: this.state.level === 1 ? '#fff' : '#DB3022',
                    fontSize: 15,
                  }}>
                  Costumer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    level: 2,
                  });
                }}
                style={{
                  width: '44%',
                  backgroundColor: this.state.level === 2 ? '#DB3022' : '#fff',
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: this.state.level === 2 ? '#fff' : '#DB3022',
                    fontSize: 15,
                  }}>
                  Seller
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Container style={s.formInput}>
            <Text
              style={{
                marginBottom: 10,
                color: 'red',
                paddingRight: 10,
                fontSize: 15,
                textAlign: 'right',
              }}>
              {this.state.errMsg}
            </Text>
            <Form>
              <Item floatingLabel style={s.inputBox}>
                <Label style={s.labelStyle} floatBack={3}>
                  Username
                </Label>
                <Input
                  style={s.inputStyle}
                  onChangeText={(e) =>
                    this.setState({
                      username: e,
                      errMsg: '',
                    })
                  }
                />
              </Item>

              <Item floatingLabel style={s.inputBox}>
                <Label style={s.labelStyle} floatBack={3}>
                  Email
                </Label>
                <Input
                  keyboardType={'email-address'}
                  style={s.inputStyle}
                  onChangeText={(e) =>
                    this.setState({
                      email: e,
                      errMsg: '',
                    })
                  }
                />
              </Item>

              {this.state.level === 2 && (
                <Item floatingLabel style={s.inputBox}>
                  <Label style={s.labelStyle} floatBack={3}>
                    Store Name
                  </Label>
                  <Input
                    style={s.inputStyle}
                    onChangeText={(e) =>
                      this.setState({
                        store: e,
                        errMsg: '',
                      })
                    }
                  />
                </Item>
              )}

              {this.state.level === 2 && (
                <Item floatingLabel style={s.inputBox}>
                  <Label style={s.labelStyle} floatBack={3}>
                    Phone Seller
                  </Label>
                  <Input
                    keyboardType={'phone-pad'}
                    style={s.inputStyle}
                    onChangeText={(e) =>
                      this.setState({
                        phone: e,
                        errMsg: '',
                      })
                    }
                  />
                </Item>
              )}

              <Item floatingLabel style={s.inputBox}>
                <Label style={s.labelStyle} floatBack={3}>
                  Password
                </Label>
                <Input
                  secureTextEntry={true}
                  style={s.inputStyle}
                  onChangeText={(e) =>
                    this.setState({
                      password: e,
                      errMsg: '',
                    })
                  }
                />
              </Item>

              <View style={s.formAction}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('signin');
                  }}>
                  <Text>Already have an account ?</Text>
                </TouchableOpacity>
                <Button
                  style={s.buttonStyle}
                  rounded
                  danger
                  block
                  onPress={() => {
                    this.hanldeSignUp();
                  }}>
                  <Text style={s.whiteText}>SIGN UP</Text>
                </Button>
              </View>
            </Form>
          </Container>
        </ScrollView>
      </View>
    );
  }
}
