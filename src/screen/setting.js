/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {createRef, useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,

  // KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import {
  Body,
  Button,
  Form,
  Header,
  Left,
  Right,
  Title,
  Item,
  Label,
  Input,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionSheet from 'react-native-actions-sheet';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

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

const SettingProfile = ({route, navigation}) => {
  const {email} = route.params;
  const [editUsername, seteditUsername] = useState(false);
  const [Username, setUsername] = useState('');
  const [msgErr, setmsgErr] = useState('');
  const [Npassword, setNpassword] = useState('');
  const [Cpassword, setCpassword] = useState('');
  const [Opassword, setOpassword] = useState('');
  const [focused, setfocused] = useState(false);
  const [username, setusername] = useState('loading ...');
  const [level, setlevel] = useState('2');
  const [Store, setStore] = useState('');
  const [Phone, setPhone] = useState('');
  const actionSheetRef = createRef();
  const actionUpgrade = createRef();
  const [isModal, setisModal] = useState(false);
  const [confModal, setconfModal] = useState({
    titleModal: '',
    descModal: '',
    actBgModal: () => {},
    act1Modal: false,
    act2Modal: false,
    act3Modal: false,
  });

  const getUserInfo = () => {
    const payload = {
      email: email,
    };

    api
      .post('profile/userinfo', payload, {
        headers: {'Content-Type': 'application/json'},
      })
      .then(({data}) => {
        setusername(data.data[0].user_name);
        setlevel(data.data[0].level_id);
      })
      .catch(() => {
        ToastAndroid.show('Failed Get User Info', 0.0001);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, [username]);

  const upgradeLevel = () => {
    const payload = {
      email: email,
      store: Store,
      phone: Phone,
    };
    if (Store === '' && Phone === '') {
      setmsgErr('Some form not fill yet');
    } else {
      api
        .put('profile/upgrade', payload, {
          headers: {'Content-Type': 'application/json'},
        })
        .then(() => {
          ToastAndroid.show('Successfully Upgrade to Seller', 0.0001);
          setmsgErr('');
          getUserInfo();
        })
        .catch((e) => {
          if (e.response.data.message === 'Conflict Data') {
            setmsgErr('Store name already taken');
            setStore('');
          }
        });
    }
  };

  const changePassword = () => {
    const payload = {
      email: email,
      old_password: Opassword,
      password: Cpassword,
    };
    if (Cpassword === '' && Npassword === '') {
      setmsgErr('Form not fill yet');
    } else if (Cpassword === Npassword) {
      api
        .put('profile/cpassword', payload, {
          headers: {'Content-Type': 'application/json'},
        })
        .then(() => {
          ToastAndroid.show('Successfully Change Password', 0.0001);
          setmsgErr('');
        })
        .catch((e) => {
          console.log('\n\n', e.response.data, '\n\n');
          if (e.response.data.message === 'Wrong Password') {
            setmsgErr('Old Password is wrong');
          }
          ToastAndroid.show('Failed Change Password', 0.0001);
        });
    } else {
      setmsgErr('Confirm Password is not match');
    }
  };

  const changeUsername = () => {
    const payload = {
      email: email,
      username: Username,
    };

    api
      .put('profile/cusername', payload, {
        headers: {'Content-Type': 'application/json'},
      })
      .then(async () => {
        let item = await AsyncStorage.getItem('token');
        item = await JSON.parse(item);
        const newToken = {...item, username: Username};
        await AsyncStorage.removeItem('token');
        await AsyncStorage.setItem('token', JSON.stringify(newToken));
        getUserInfo();
        seteditUsername(false);
      })
      .catch(() => {
        ToastAndroid.show('Failed Change Username', 0.0001);
      });
  };
  const windowHeight = Dimensions.get('window').height;

  return (
    <>
      {isModal && (
        <Modal
          title={confModal.titleModal}
          desc={confModal.descModal}
          background={confModal.actBgModal}
          button1={confModal.act1Modal}
          button2={confModal.act2Modal}
          button3={confModal.act3Modal}
        />
      )}
      <Header style={styles.header}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Left>
          <Button
            transparent
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialCommunityIcons
              name="chevron-left"
              color={'#888'}
              size={35}
            />
          </Button>
        </Left>
        <Body>
          <Title style={{color: '#888'}}>{''}</Title>
        </Body>
        <Right>
          {/* <Button transparent>
              <MaterialCommunityIcons name="magnify" color={'#888'} size={25} />
            </Button> */}
        </Right>
      </Header>
      <ScrollView style={styles.container}>
        <Text style={{fontSize: 34, marginVertical: 15}}>Settings</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}>
          <Text style={{fontSize: 16}}>Personal Information</Text>
          <TouchableOpacity
            onPress={() => {
              seteditUsername(true);
            }}>
            <Text style={{fontSize: 14, color: 'dimgray'}}>Change</Text>
          </TouchableOpacity>
        </View>
        {editUsername ? (
          <Form>
            <Item floatingLabel style={styles.inputBox}>
              <Label style={styles.labelStyle} floatBack={5}>
                New Username
              </Label>
              <Input
                style={styles.inputStyle}
                onChangeText={(e) => setUsername(e)}
                onEndEditing={() => {
                  if (Username !== '') {
                    setisModal(true);
                    setconfModal({
                      titleModal: 'Changes Confirmation',
                      descModal:
                        'Are you sure want to change your current username?',
                      actBgModal: () => {},
                      act1Modal: {
                        text: 'no',
                        onpress: () => {
                          setisModal(false);
                          seteditUsername(false);
                        },
                      },
                      act2Modal: {
                        text: 'yes',
                        onpress: () => {
                          setisModal(false);
                          changeUsername();
                          seteditUsername(false);
                        },
                      },
                      act3Modal: false,
                    });
                  }
                  seteditUsername(false);
                }}
              />
            </Item>
          </Form>
        ) : (
          <View style={styles.fullname}>
            <Text style={{color: 'dimgray'}}>{username}</Text>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
            marginBottom: 5,
          }}>
          <Text style={{fontSize: 16}}>Password</Text>
          <TouchableOpacity
            onPress={() => {
              actionSheetRef.current?.setModalVisible();
            }}>
            <Text style={{fontSize: 14, color: 'dimgray'}}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fullname}>
          <Text style={{color: 'dimgray'}}>Password</Text>
          <Text style={{color: 'dimgray'}}>****************</Text>
        </View>
        {level !== '2' && (
          <View>
            <Text
              style={{
                fontSize: 16,
                marginTop: 30,
                marginBottom: 5,
              }}>
              Become Seller
            </Text>
            <View style={{margin: 10}}>
              <Button
                style={styles.buttonStyle}
                rounded
                danger
                block
                onPress={() => {
                  actionUpgrade.current?.setModalVisible();
                }}>
                <Text style={styles.whiteText}>Upgrade My Account</Text>
              </Button>
            </View>
          </View>
        )}
      </ScrollView>

      {/* bug on keyboard */}
      {/* <KeyboardAvoidingView> */}
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          bottom: focused ? 200 : 0,
        }}>
        <TouchableWithoutFeedback
          onPress={() => setfocused(false)}
          onBlur={() => setfocused(false)}>
          <View
            style={{
              ...styles.form,
              height: windowHeight * 0.6,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 18,
                marginTop: 20,
              }}>
              Change Password
            </Text>
            <Form>
              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.labelStyle} floatBack={5}>
                  Old Password
                </Label>
                <Input
                  secureTextEntry={true}
                  style={styles.inputStyle}
                  onChangeText={(e) => {
                    setOpassword(e);
                    setmsgErr('');
                  }}
                  onFocus={() => focused === false && setfocused(true)}
                />
              </Item>
              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.labelStyle} floatBack={5}>
                  New Password
                </Label>
                <Input
                  secureTextEntry={true}
                  style={styles.inputStyle}
                  onChangeText={(e) => {
                    setNpassword(e);
                    setmsgErr('');
                  }}
                  onFocus={() => focused === false && setfocused(true)}
                />
              </Item>
              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.labelStyle} floatBack={5}>
                  Confirm Password
                </Label>
                <Input
                  secureTextEntry={true}
                  style={styles.inputStyle}
                  onChangeText={(e) => {
                    setCpassword(e);
                    setmsgErr('');
                  }}
                  onFocus={() => focused === false && setfocused(true)}
                />
              </Item>
              <View style={styles.formAction}>
                <Text
                  style={{
                    color: 'red',
                    paddingRight: 10,
                    fontSize: 15,
                    textAlign: 'right',
                  }}>
                  {msgErr}
                </Text>
                <Button
                  style={styles.buttonStyle}
                  rounded
                  danger
                  block
                  onPress={() => {
                    changePassword();
                  }}>
                  <Text style={styles.whiteText}>APPLY</Text>
                </Button>
              </View>
            </Form>
          </View>
        </TouchableWithoutFeedback>
      </ActionSheet>

      <ActionSheet
        ref={actionUpgrade}
        containerStyle={{
          bottom: focused ? 260 : 0,
        }}>
        <TouchableWithoutFeedback
          onPress={() => setfocused(false)}
          onBlur={() => setfocused(false)}>
          <View
            style={{
              ...styles.form,
              height: windowHeight * 0.5,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 18,
                marginTop: 20,
              }}>
              Become Seller
            </Text>
            <Form>
              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.labelStyle} floatBack={5}>
                  Store Name
                </Label>
                <Input
                  defaultValue={Store}
                  style={styles.inputStyle}
                  onChangeText={(e) => {
                    setStore(e);
                    setmsgErr('');
                  }}
                  onFocus={() => focused === false && setfocused(true)}
                />
              </Item>
              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.labelStyle} floatBack={5}>
                  Phone
                </Label>
                <Input
                  keyboardType={'phone-pad'}
                  style={styles.inputStyle}
                  onChangeText={(e) => {
                    setPhone(e);
                    setmsgErr('');
                  }}
                  onFocus={() => focused === false && setfocused(true)}
                />
              </Item>
              <View style={styles.formAction}>
                <Text
                  style={{
                    color: 'red',
                    paddingRight: 10,
                    fontSize: 15,
                    textAlign: 'right',
                  }}>
                  {msgErr}
                </Text>
                <Button
                  style={styles.buttonStyle}
                  rounded
                  danger
                  block
                  onPress={() => {
                    upgradeLevel();
                  }}>
                  <Text style={styles.whiteText}>APPLY</Text>
                </Button>
              </View>
            </Form>
          </View>
        </TouchableWithoutFeedback>
      </ActionSheet>
      {/* </KeyboardAvoidingView> */}
    </>
  );
};

export default SettingProfile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  fullname: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  header: {
    marginTop: 30,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },

  form: {
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
  },
  inputBox: {
    width: '97%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    elevation: 6,
    borderRadius: 8,
    marginLeft: 0,
    marginTop: 10,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
    bottom: 0,
    top: 0,
    height: 70,
  },
  labelStyle: {
    paddingHorizontal: 12,
    paddingTop: 15,
    marginBottom: 0,
    paddingBottom: 0,
  },
  inputStyle: {height: 50, top: 5},
  formAction: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 80,
  },
  buttonStyle: {
    elevation: 6,
  },
  whiteText: {
    color: '#fff',
  },
});
