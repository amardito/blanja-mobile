/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Container, Form, Item, Input, Label, Button} from 'native-base';

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
    };
  }
  render() {
    console.log(this.state);
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
                  Consumer
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
              {'this is error'}
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
                    })
                  }
                />
              </Item>

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
                    style={s.inputStyle}
                    onChangeText={(e) =>
                      this.setState({
                        phone: e,
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
                    this.props.navigation.navigate('signin');
                  }}>
                  <Text>Already have an account ?</Text>
                </TouchableOpacity>
                <Button style={s.buttonStyle} rounded danger block>
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
