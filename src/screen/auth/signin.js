/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Container, Form, Item, Input, Label, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {connect} from 'react-redux';
import {authLoginAction} from '../../global/ActionCreators/auth';

import s from '../../styles/authStyle';

import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: BASE_URL,
});

class signin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      level: 1,
      errMsg: '',
    };
    this._storeData = async (token) => {
      console.log(`\n
      succes login, storing token ...
      `);
      try {
        await AsyncStorage.setItem('token', token);
      } catch (error) {
        // Error saving data
        console.log(error);
      }
    };
  }

  handleLogin = async () => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]/;
    if (this.state.email === '') {
      this.setState({errMsg: 'Fill your email first'});
    } else if (!this.state.email.match(mailformat)) {
      this.setState({errMsg: "Invalid email format ['@', '.', 'domain']"});
    } else if (this.state.password === '') {
      this.setState({errMsg: 'Fill your password first'});
    } else {
      const payload = JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        level: this.state.level,
      });

      console.log(`\n
      getting user data...
      `);

      await api
        .post('auth/login', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(async ({data}) => {
          this.props.dispatch(authLoginAction(data.data.login_as));
          await this._storeData(JSON.stringify(data.data));

          this.props.navigation.navigate('mainscreen');
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response.status === 404) {
            this.setState({
              errMsg: 'Email or password is wrong',
              email: '',
              password: '',
            });
          }
          if (
            e.response.data.error === 'Your account not registred as seller'
          ) {
            this.setState({
              errMsg: 'Your account not registred as seller',
              email: '',
              password: '',
            });
          }
          if (e.response.data.error === 'wrong password') {
            this.setState({
              errMsg: 'Email or password is wrong',
              password: '',
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
            <Text style={s.headerText}> Login </Text>
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
                  Email
                </Label>
                <Input
                  keyboardType={'email-address'}
                  style={s.inputStyle}
                  onChangeText={(e) =>
                    this.setState({
                      email: e,
                      errMsg: null,
                    })
                  }
                  defaultValue={this.state.email}
                />
              </Item>

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
                      errMsg: null,
                    })
                  }
                  defaultValue={this.state.password}
                />
              </Item>

              <View style={s.formAction}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('forgotpass');
                  }}>
                  <Text>Forgot Your Password ?</Text>
                </TouchableOpacity>
                <Button
                  style={s.buttonStyle}
                  rounded
                  danger
                  block
                  onPress={() => {
                    this.handleLogin();
                  }}>
                  <Text style={s.whiteText}>LOGIN</Text>
                </Button>
              </View>
            </Form>
          </Container>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(signin);
