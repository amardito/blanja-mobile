/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {connect} from 'react-redux';
import {authLogoutAction} from '../global/ActionCreators/auth';

import {
  Body,
  Button,
  Card,
  CardItem,
  Header,
  Left,
  Right,
  Thumbnail,
  Title,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import s from '../styles/profileStyle';

const api = axios.create({
  baseURL: 'http://192.168.1.7:1010/api/v1/',
});

class profile extends Component {
  constructor(props) {
    super(props);
    const {auth, navigation} = props;
    this.state = {
      token: {},
    };
    this._auth = async () => {
      console.log(`\n
      try access profile screen, Validating auth:
      `);
      try {
        auth.isLogin
          ? (console.log('      success'), this.getToken())
          : (console.log('      failed'),
            navigation.reset({
              index: 0,
              routes: [{name: 'mainscreen'}, {name: 'signup'}],
            }));
      } catch (error) {
        // Error get data
        console.log(error);
      }
    };
  }

  getToken = async () => {
    try {
      let item = await AsyncStorage.getItem('token');
      item = await JSON.parse(item);
      console.log(`
      getting token ... \n
      success
      `);
      // console.log(typeof item);
      this.setState({
        token: item,
      });
    } catch (error) {
      // Error get data
      console.log(error);
    }
  };

  logoutHandle = async () => {
    const {token} = this.state;
    await api
      .post('auth/logout', null, {
        headers: {
          'Content-Length': '0',
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then(async () => {
        await AsyncStorage.removeItem('token');
        console.log(`\n
        success to Logout ...
        `);
        await this.props.dispatch(authLogoutAction());
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'home'}],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  componentDidMount = async () => {
    this._auth();
  };

  render() {
    const {username, email} = this.state.token !== null && this.state.token;
    const ImageProfile = undefined;
    const address = this.props.address.data;
    return (
      <>
        <Header style={s.header}>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Left>
            {/* <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <MaterialCommunityIcons
                name="chevron-left"
                color={'#888'}
                size={35}
              />
            </Button> */}
          </Left>
          <Body>
            <Title style={{color: '#888'}}>{''}</Title>
          </Body>
          <Right>
            <Button transparent>
              <MaterialCommunityIcons name="magnify" color={'#888'} size={25} />
            </Button>
          </Right>
        </Header>
        <ScrollView>
          <Text style={s.textHeader}>My Profile</Text>

          <Card transparent style={s.profile}>
            <CardItem style={{backgroundColor: 'transparent'}}>
              <Left>
                {ImageProfile !== undefined ? (
                  <Thumbnail large source={{uri: ImageProfile}} />
                ) : (
                  <MaterialCommunityIcons
                    name="account"
                    color={'#888'}
                    size={50}
                  />
                )}
                <Body>
                  <Text style={s.profileName}>{username}</Text>
                  <Text note>{email}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>

          <View style={{padding: 14}}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('MyOrder')
              }}>
              <View style={s.accordian}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    My Order
                  </Text>
                  <Text style={{color: 'grey'}}>Already have 12 orders</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  color={'#888'}
                  size={35}
                />
              </View>
            </TouchableOpacity>
            <View style={s.line} />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('addresslist');
              }}>
              <View style={s.accordian}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    Shipping Address
                  </Text>
                  <Text style={{color: 'grey'}}>
                    {address.length ? address.length : '0'} Address
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  color={'#888'}
                  size={35}
                />
              </View>
            </TouchableOpacity>
            <View style={s.line} />
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Setting')
              }}>
              <View style={s.accordian}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    Setting
                  </Text>
                  <Text style={{color: 'grey'}}>Notification, password</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  color={'#888'}
                  size={35}
                />
              </View>
            </TouchableOpacity>
            <View style={s.line} />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 55,
              marginBottom: 40,
            }}>
            <TouchableOpacity
              style={{
                height: 48,
                width: 300,
                borderRadius: 25,
                backgroundColor: '#DB3022',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 5,
              }}
              onPress={() => this.logoutHandle()}>
              <Text style={{color: 'white', fontWeight: '700'}}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
}
const mapStateToProps = ({auth, address}) => {
  return {
    auth,
    address,
  };
};

export default connect(mapStateToProps)(profile);
