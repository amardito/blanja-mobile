/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  RefreshControl,
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

import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: BASE_URL,
});

class Modal extends Component {
  render() {
    const {height, width} = Dimensions.get('screen');
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 0,
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={this.props.background}
          style={{backgroundColor: '#00000090', width: '100%', height: '100%'}}
        />

        <View
          style={{
            backgroundColor: '#fff',
            elevation: 5,
            width: '70%',
            position: 'absolute',
            zIndex: 1,
            borderRadius: 14,
            alignItems: 'center',
            paddingTop: 18,
            overflow: 'hidden',
          }}>
          <Text style={{fontSize: 22, marginBottom: 10, fontWeight: '700'}}>
            {this.props.title}
          </Text>
          <Text
            style={{
              paddingHorizontal: 30,
              textAlign: 'center',
              paddingBottom: 19,
            }}>
            {this.props.desc}
          </Text>
          <View
            style={{
              borderTopWidth: 2,
              borderTopColor: '#e0e0e0',
              backgroundColor: '#e0e0e0',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={this.props.button1.onpress}
              style={{
                backgroundColor: '#fff',
                width: this.props.button3
                  ? '32.8%'
                  : this.props.button2
                  ? '49.5%'
                  : '100%',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#D03022',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  fontSize: 15,
                }}>
                {this.props.button1.text}
              </Text>
            </TouchableOpacity>

            {this.props.button2 && (
              <TouchableOpacity
                onPress={this.props.button2.onpress}
                style={{
                  backgroundColor: '#fff',
                  width: this.props.button3 ? '32.8%' : '49.5%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#D03022',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    fontSize: 15,
                  }}>
                  {this.props.button2.text}
                </Text>
              </TouchableOpacity>
            )}

            {this.props.button3 && (
              <TouchableOpacity
                onPress={this.props.button3.onpress}
                style={{
                  backgroundColor: '#fff',
                  width: '32.8%',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#D03022',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    fontSize: 15,
                  }}>
                  {this.props.button3.text}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

class profile extends Component {
  constructor(props) {
    super(props);
    const {auth, navigation} = props;
    this.state = {
      token: {},
      isModal: false,
      titleModal: '',
      descModal: '',
      actBgModal: () => {},
      act1Modal: false,
      act2Modal: false,
      act3Modal: false,
      refresh: false,
    };
    this._auth = async () => {
      console.log(`\n
      try access profile screen, Validating auth:
      `);
      try {
        auth.isLogin
          ? (console.log('      success'),
            this.getToken(),
            this.setState({isModal: false}))
          : (console.log('      failed'),
            this.setState({
              isModal: true,
              titleModal: 'Restricted features',
              descModal:
                'you are not logged in, please Signup first to access this feature',
              act1Modal: {
                text: 'Later',
                onpress: () => {
                  navigation.navigate('home');
                },
              },
              act2Modal: {
                text: 'Signup',
                onpress: () => {
                  navigation.reset({
                    index: 1,
                    routes: [{name: 'mainscreen'}, {name: 'signup'}],
                  });
                },
              },
              act3Modal: false,
              actBgModal: () => {
                navigation.navigate('home');
              },
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

      this.setState({
        token: item,
      });
    } catch (error) {
      // Error get data
      console.log(error);
    }
  };

  onRefresh = () => {
    this.setState({refresh: true});
    wait(700).then(async () => {
      await this.getToken();
      this.setState({refresh: false});
    });
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
    const {
      isModal,
      titleModal,
      descModal,
      act1Modal,
      act2Modal,
      act3Modal,
      actBgModal,
      refresh,
    } = this.state;

    return (
      <>
        {isModal && (
          <Modal
            title={titleModal}
            desc={descModal}
            background={actBgModal}
            button1={act1Modal}
            button2={act2Modal}
            button3={act3Modal}
          />
        )}
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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => this.onRefresh()}
            />
          }>
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
            {this.props.auth.level !== 'seller' ? (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('myorder');
                }}>
                <View style={s.accordian}>
                  <View>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      My Order
                    </Text>
                    <Text style={{color: 'grey'}}>
                      See your history payment here!
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    color={'#888'}
                    size={35}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('myproduct');
                }}>
                <View style={s.accordian}>
                  <View>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      My Product
                    </Text>
                    <Text style={{color: 'grey'}}>
                      See your product list at here!
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    color={'#888'}
                    size={35}
                  />
                </View>
              </TouchableOpacity>
            )}
            <View style={s.line} />

            {this.props.auth.level !== 'seller' ? (
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
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('addproduct');
                }}>
                <View style={s.accordian}>
                  <View>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      Add Product
                    </Text>
                    <Text style={{color: 'grey'}}>
                      Add your new product here!
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    color={'#888'}
                    size={35}
                  />
                </View>
              </TouchableOpacity>
            )}
            <View style={s.line} />

            {this.props.auth.level === 'seller' && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('chatlist');
                  }}>
                  <View style={s.accordian}>
                    <View>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        Chat
                      </Text>
                      <Text style={{color: 'grey'}}>
                        Chat your customer here
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
              </>
            )}

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('setting', {
                  email: email,
                });
              }}>
              <View style={s.accordian}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    Setting
                  </Text>
                  <Text style={{color: 'grey'}}>
                    Notification, password, etc.
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
              onPress={() =>
                this.setState({
                  isModal: true,
                  titleModal: 'Logout',
                  descModal: 'Are you sure want to logout?',
                  act1Modal: {
                    text: 'No',
                    onpress: () => {
                      this.setState({isModal: false});
                    },
                  },
                  act2Modal: {
                    text: 'Yes',
                    onpress: () => this.logoutHandle(),
                  },
                  act3Modal: false,
                  actBgModal: () => {
                    this.setState({isModal: false});
                  },
                })
              }>
              <View style={s.accordian}>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>Logout</Text>
                  <Text style={{color: 'grey'}}>
                    Logout from current session
                  </Text>
                </View>
                {/* <MaterialCommunityIcons
                  name="chevron-right"
                  color={'#888'}
                  size={35}
                /> */}
              </View>
            </TouchableOpacity>
            <View style={s.line} />
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
