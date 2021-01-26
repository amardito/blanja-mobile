/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, StatusBar} from 'react-native';
import {Header, Left, Body, Right, Button, Title} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import alasql from 'alasql';
import {TouchableOpacity} from 'react-native-gesture-handler';

const api = axios.create({
  baseURL: 'http://192.168.1.15:1010/api/v1/',
});

const orderlist = (props) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    if ((await AsyncStorage.getItem('token')) !== null) {
      const token = await AsyncStorage.getItem('token');

      const data = {
        email: JSON.parse(token).email,
      };
      await api
        .post('userorder', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const payloaddata =
            res.data.data[0] !== undefined
              ? alasql(
                  'SELECT id_payment, track_id, status, created_at, SUM(CAST([qty] AS INT)) AS [qty], SUM(CAST([price] AS INT)) AS [price] \
                FROM ? GROUP BY id_payment, track_id, status, created_at',
                  [res.data.data],
                )
              : [];
          setHistory(payloaddata);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
              props.navigation.goBack();
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
          <Button transparent>
            <MaterialCommunityIcons name="magnify" color={'#888'} size={25} />
          </Button>
        </Right>
      </Header>
      <ScrollView vertical={true}>
        <View style={styles.titlewrap}>
          <Text style={styles.title}>My Orders</Text>
        </View>

        {history.length !== 0 ? (
          history.map(
            ({id_payment, price, qty, track_id, status, created_at}, index) => {
              const date = String(created_at).split('T')[0].split('-');
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    props.navigation.navigate('orderdetail', {
                      id_payment: id_payment,
                      date: date,
                    });
                  }}>
                  <View style={styles.cardOrders}>
                    <View style={styles.noOrders}>
                      <Text style={styles.titleOrder}>
                        Order No: {id_payment}
                      </Text>
                      <Text
                        style={
                          styles.date
                        }>{`${date[2]}-${date[1]}-${date[0]}`}</Text>
                    </View>
                    <View style={styles.infOrders}>
                      <Text style={styles.textKey}>Tracking number:</Text>
                      <Text style={styles.textValue}>{track_id}</Text>
                    </View>
                    <View style={styles.infOrders}>
                      <Text style={styles.textKey}>Quantity:</Text>
                      <Text style={styles.textValue}>{qty}</Text>
                    </View>
                    <View style={styles.infOrders}>
                      <Text style={styles.textKey}>Total Amount:</Text>
                      <Text style={styles.textValue}>Rp. {price}</Text>
                    </View>
                    <View style={styles.delivStat}>
                      <Text
                        style={{
                          color:
                            status === 'Delivering' ? '#ff9900' : '#2AA952',
                        }}>
                        {status}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            },
          )
        ) : (
          <View style={{paddingTop: 15, paddingLeft: 20}}>
            <Text style={{fontSize: 15, color: 'dimgray'}}>
              You don't have a recent order checkout
            </Text>
          </View>
        )}
        <View style={{marginBottom: 25}} />
      </ScrollView>
    </>
  );
};

export default orderlist;

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
  date: {
    color: 'gray',
  },
  titleOrder: {
    fontSize: 14,
  },
  delivStat: {
    alignItems: 'flex-end',
  },
  textKey: {
    marginRight: 10,

    color: 'gray',
    fontSize: 14,
  },
  textValue: {
    fontSize: 14,
  },
  infOrders: {
    flexDirection: 'row',
    marginTop: 15,
  },
  noOrders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
  },
  titlewrap: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  cardOrders: {
    padding: 17,
    borderRadius: 8,
    marginHorizontal: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    marginTop: 24,
  },
});
