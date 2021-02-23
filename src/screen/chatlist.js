/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import {Body, Button, Header, Left, Title} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-community/async-storage';
import {useSocket} from '../utils/context/SocketProvider';

const api = axios.create({
  baseURL: BASE_URL,
});

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ChatList = (props) => {
  const [HistoryChat, setHistoryChat] = useState([]);
  const [refresh, setrefresh] = useState(false);

  const io = useSocket();

  const getUserChat = async () => {
    let item = await AsyncStorage.getItem('token');
    item = await JSON.parse(item);
    const {id} = item;
    api
      .get(`chatSeller/${id}`)
      .then(({data}) => {
        setHistoryChat(data.data);
      })
      .catch(() => {
        ToastAndroid.show('Failed Get User History Chat', 0.0001);
      });
  };

  const onRefresh = () => {
    setrefresh(true);
    wait(700).then(async () => {
      await getUserChat();
      setrefresh(false);
    });
  };

  useEffect(() => {
    getUserChat();
    io.on('new_message', function () {
      getUserChat();
    });
    return () => {
      io.off('new_message');
    };
  }, [io]);

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
            {'Chat To Customer'}
          </Title>
        </Body>
      </Header>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => onRefresh()} />
        }>
        <View style={s.holder} />
        {HistoryChat.length ? (
          HistoryChat.map(({senderID, senderName, message}, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  props.navigation.navigate('chat', {
                    receiverName: senderName,
                    receiverID: senderID,
                  });
                }}>
                <View style={s.chatItem}>
                  <Text style={s.name}>{senderName}</Text>
                  <Text style={s.message}>{message}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <>
            <Text style={s.textHolder}>{'Getting some data\n\n'}</Text>
            <Text style={s.textHolder}>
              If this take a long time please refresh
            </Text>
          </>
        )}
        <View style={s.holder} />
      </ScrollView>
    </>
  );
};

export default ChatList;

import {StyleSheet} from 'react-native';

const s = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
  chatItem: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  holder: {
    marginVertical: 10,
  },
  textHolder: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  name: {
    color: '#000',
    fontSize: 17,
  },
  message: {
    color: '#666',
    fontSize: 14,
  },
});
