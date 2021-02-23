/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useSocket} from '../utils/context/SocketProvider';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {BASE_URL} from '@env';

import {Header, Left, Body, Right, Button, Title} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const api = axios.create({
  baseURL: BASE_URL,
});

const Chat = ({navigation, route}) => {
  const {receiverID, receiverName} = route.params;
  const [userID, setuserID] = useState();
  const [userName, setuserName] = useState();
  const [messagePayload, setmessagePayload] = useState('');
  const [messageList, setmessageList] = useState([]);

  const [scrollView, setscrollView] = useState();
  const io = useSocket();

  // prev message
  useEffect(() => {
    async function getPrevMessage() {
      let item = await AsyncStorage.getItem('token');
      item = await JSON.parse(item);
      const {id} = item;
      api
        .get(`getChat?userID=${id}&receiverID=${receiverID}`)
        .then(({data}) => {
          const model = [];
          data.data.map(({senderID, senderName, message}) => {
            model.push({id: senderID, name: senderName, message: message});
          });
          setmessageList(model);
        })
        .catch(() => {
          ToastAndroid.show('Failed Get User History Chat', 0.0001);
        });
    }
    getPrevMessage();
  }, [receiverID]);

  //new message
  useEffect(() => {
    async function getInfo() {
      let item = await AsyncStorage.getItem('token');
      item = await JSON.parse(item);
      const {id, username} = item;
      setuserID(id);
      setuserName(username);
    }
    getInfo();
    if (io === undefined) {
      return;
    }
    io.on('connect', () => {
      console.log('\nconnected to server\n');
    });
    io.on('new_message', function (payloadData) {
      const {senderID, senderName, message} = payloadData;
      if (senderID === receiverID) {
        setmessageList(
          messageList.concat([
            {
              id: senderID,
              name: senderName,
              message: message,
            },
          ]),
        );
      } else {
        setmessageList(messageList);
      }
    });

    return () => {
      io.off('connect');
      io.off('new_message');
    };
  }, [io, messageList, receiverID]);

  const sendMessage = () => {
    // send message to server
    io.emit('send_message', {
      senderID: userID,
      senderName: userName,
      receiverID: receiverID,
      receiverName: receiverName,
      message: messagePayload,
      time: new Date(Date.now()),
    });

    // append your own message
    setmessageList(
      messageList.concat([
        {id: userID, name: userName, message: messagePayload},
      ]),
    );

    // prevent form from submitting
    return setmessagePayload('');
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
          <Title style={{color: '#888'}}>{receiverName}</Title>
        </Body>
        <Right>
          {/* <Button transparent>
            <MaterialCommunityIcons
              name="share-variant"
              color={'#888'}
              size={25}
            />
          </Button> */}
        </Right>
      </Header>
      <ScrollView
        ref={(ref) => setscrollView(ref)}
        onContentSizeChange={() => {
          scrollView.scrollToEnd({animated: true, index: -1}, 200);
        }}>
        <View style={{paddingTop: 20}}>
          {messageList.map(({id, name, message}, index) => {
            if (id === userID) {
              return (
                <View style={s.sender} key={index}>
                  <Text style={s.senderName}>{'me'}</Text>

                  <Text style={s.senderMsg}>{message}</Text>
                </View>
              );
            } else {
              return (
                <View style={s.receiver} key={index}>
                  <Text style={s.receiverName}>{name}</Text>

                  <Text style={s.receiverMsg}>{message}</Text>
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
      <KeyboardAvoidingView>
        <View style={s.actionMsg}>
          <TextInput
            style={{
              ...s.inputMsg,
              borderColor: messagePayload.length ? '#DB3022' : '#aaa',
              backgroundColor: messagePayload.length ? '#f5f5f5' : '#eee',
            }}
            multiline={true}
            onChangeText={(text) => setmessagePayload(text)}
            value={messagePayload}
          />
          {messagePayload.length ? (
            <TouchableOpacity style={s.sendMsg} onPress={() => sendMessage()}>
              <MaterialCommunityIcons
                name="chevron-right"
                color="#fff"
                size={40}
              />
            </TouchableOpacity>
          ) : (
            <View style={s.cantsendMsg}>
              <MaterialCommunityIcons
                name="chevron-right"
                color="#fff"
                size={40}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Chat;

const s = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
  senderName: {
    fontSize: 17,
    alignSelf: 'flex-end',
  },
  sender: {
    paddingHorizontal: 20,
    maxWidth: 250,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  senderMsg: {
    fontSize: 15,
    marginTop: 5,
    borderRadius: 15,
    backgroundColor: '#DB3022',
    color: '#fff',
    elevation: 3,
    padding: 10,
  },
  receiverName: {
    fontSize: 17,
    alignSelf: 'flex-start',
  },
  receiver: {
    paddingHorizontal: 20,
    maxWidth: 250,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  receiverMsg: {
    fontSize: 15,
    marginTop: 5,
    borderRadius: 15,
    backgroundColor: '#fff',
    elevation: 3,
    padding: 10,
  },
  actionMsg: {
    backgroundColor: '#fff',
    elevation: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
  inputMsg: {
    width: '80%',
    minHeight: 50,
    maxHeight: 90,
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: '#aaa',
    borderRadius: 15,
    paddingLeft: 10,
  },
  sendMsg: {
    width: 50,
    height: 50,
    backgroundColor: '#DB3022',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  cantsendMsg: {
    width: 50,
    height: 50,
    backgroundColor: '#aaa',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});
