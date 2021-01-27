/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createRef, useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  // KeyboardAvoidingView,
  TouchableWithoutFeedback,
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

const api = axios.create({
  baseURL: 'http://192.168.1.15:1010/api/v1/',
});

const SettingProfile = ({route, navigation}) => {
  const {email} = route.params;
  const [editUsername, seteditUsername] = useState(false);
  const [Username, setUsername] = useState('');
  const [msgErr, setmsgErr] = useState('');
  const [Npassword, setNpassword] = useState('');
  const [Cpassword, setCpassword] = useState('');
  const [focused, setfocused] = useState(false);
  const [username, setusername] = useState('loading ...');
  const [level, setlevel] = useState('2');
  const [Store, setStore] = useState('');
  const [Phone, setPhone] = useState('');
  const actionSheetRef = createRef();
  const actionUpgrade = createRef();

  console.log(level);

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
        Alert.alert('Failed Get User Info');
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
          Alert.alert(
            'Successfully Upgrade Account',
            'Now you can access seller level',
          );
          setmsgErr('');
          getUserInfo();
        })
        .catch((e) => {
          if (e.response.data.message === 'Conflict Data') {
            setmsgErr('Store name already taken');
            setStore('');
          }
          // Alert.alert('Failed Change Password');
        });
    }
  };

  const changePassword = () => {
    const payload = {
      email: email,
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
          Alert.alert('Successfully Change Password');
          setmsgErr('');
        })
        .catch(() => {
          Alert.alert('Failed Change Password');
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
      .then(() => {
        getUserInfo();
        seteditUsername(false);
      })
      .catch(() => {
        Alert.alert('Failed Change Username');
      });
  };
  const windowHeight = Dimensions.get('window').height;

  return (
    <>
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
                    Alert.alert(
                      'Information',
                      'Are you sure want to change your current username?',
                      [
                        {text: 'yes', onPress: () => changeUsername()},
                        {text: 'no'},
                      ],
                      {cancelable: true},
                    );
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
              Change Password
            </Text>
            <Form>
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
