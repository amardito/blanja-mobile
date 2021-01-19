/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Container, Form, Item, Input, Label, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {connect} from 'react-redux';
import {authLoginAction} from '../../global/ActionCreators/auth';

import s from '../../styles/authStyle';

const api = axios.create({
  baseURL: 'http://192.168.1.7:1010/api/v1/',
});

class signin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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
        level: 1,
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
          this.props.dispatch(authLoginAction());
          await this._storeData(JSON.stringify(data.data));

          this.props.navigation.navigate('mainscreen');
        })
        .catch((e) => {
          if (e.response.status === 404) {
            this.setState({
              errMsg: 'Email or password is wrong',
              email: '',
              password: '',
            });
          }
          if (e.response.status === 401) {
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
              alignItems: 'flex-end',
            }}>
            <Text style={s.headerText}> Login </Text>
            <Text
              style={{
                marginBottom: 45,
                color: 'red',
                paddingRight: 10,
                fontSize: 15,
              }}>
              {this.state.errMsg}
            </Text>
          </View>
          <Container style={s.formInput}>
            <Form>
              <Item floatingLabel style={s.inputBox}>
                <Label style={s.labelStyle} floatBack={3}>
                  Email
                </Label>
                <Input
                  style={s.inputStyle}
                  onChangeText={(e) =>
                    this.setState({
                      email: e,
                    })
                  }
                />
              </Item>

              <Item floatingLabel style={s.inputBox}>
                <Label style={s.labelStyle} floatBack={3}>
                  Password
                </Label>
                <Input
                  style={s.inputStyle}
                  onChangeText={(e) =>
                    this.setState({
                      password: e,
                    })
                  }
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
