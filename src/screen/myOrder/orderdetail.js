/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import axios from 'axios';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Header, Title, Content, Button, Left, Right, Body} from 'native-base';
import alasql from 'alasql';

import CardOrder from '../../components/card/cardOrder';

import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: BASE_URL,
});

const orderdetail = (props) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    await api
      .get(`order/${props.route.params.id_payment}`)
      .then((res) => {
        setHistory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const date = props.route.params.date;
  const total =
    history[0] !== undefined
      ? alasql('SELECT SUM(CAST([price] AS INT)) AS [price] \
        FROM ? ', [
          history,
        ])[0].price
      : 0;

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
          <Title
            style={{
              color: '#555',
              textAlign: 'center',
              width: '100%',
              fontSize: 20,
              left: 50,
            }}>
            {'Detail Order'}
          </Title>
        </Body>
        <Right>
          <Button transparent>
            <MaterialCommunityIcons name="magnify" color={'#888'} size={25} />
          </Button>
        </Right>
      </Header>
      <Content style={{backgroundColor: '#f0f0f0', margin: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            Order No :
            <Text style={{fontWeight: '600'}}>
              {' '}
              {history[0] !== undefined ? history[0].id_payment : 'loading ...'}
            </Text>
          </Text>
          <Text
            style={{
              color: 'dimgray',
            }}>
            {date[0] !== undefined
              ? `${date[2]}-${date[1]}-${date[0]}`
              : 'loading ...'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 16}}>
            Tracking Number :
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              {' '}
              {history[0] !== undefined ? history[0].track_id : 'loading...'}
            </Text>
          </Text>
          <Text
            style={{
              color:
                history[0] !== undefined
                  ? history[0].status === 'Delivering'
                    ? '#ff9900'
                    : '#2AA952'
                  : 'dimgray',
              fontWeight: 'bold',
            }}>
            {history[0] !== undefined ? history[0].status : 'loading...'}
          </Text>
        </View>
        <Text style={{fontWeight: 'bold', marginBottom: 15, marginTop: 10}}>
          {history[0] !== undefined ? String(history.length) : 'loading...'}{' '}
          Items
        </Text>
        {history[0] !== undefined &&
          history.map(
            (
              {product_name, price, product_img, color, size, qty, product_by},
              index,
            ) => {
              return (
                <>
                  <CardOrder
                    key={index}
                    name={product_name}
                    by={product_by}
                    price={price}
                    img={product_img.split(',')[0]}
                    color={color}
                    size={size}
                    qty={qty}
                  />
                </>
              );
            },
          )}
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>
          Order Information
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'gray', width: 125, marginBottom: 10}}>
            Shipping Address :{' '}
          </Text>
          <Text style={{width: 215, fontWeight: 'bold'}}>
            {history[0] !== undefined
              ? `${history[0].address_street}, ${history[0].address_city}, ${history[0].address_region}`
              : 'loading...'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 30,
            marginBottom: 10,
            marginTop: 5,
          }}>
          <Text style={{width: 125, color: 'gray'}}>Payment Method : </Text>
          {history[0] !== undefined && history[0].payment === '1' && (
            <Image
              style={{marginHorizontal: 5}}
              source={require('../../assets/mastercard.png')}
            />
          )}
          {history[0] !== undefined && history[0].payment === '2' && (
            <Image
              style={{marginHorizontal: 5}}
              source={require('../../assets/posIndonesia.png')}
            />
          )}
          {history[0] !== undefined && history[0].payment === '3' && (
            <Image
              style={{marginHorizontal: 5}}
              source={require('../../assets/Gopay.png')}
            />
          )}
          <Text style={{width: 135}}>
            {history[0] !== undefined ? ' **** **** **** 3947' : 'loading ...'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Text style={{color: 'gray', width: 125}}>Delivery Method </Text>
          <Text style={{width: 215, fontWeight: 'bold'}}>
            Fedex, 3 Days, 15$
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Text style={{color: 'gray', width: 125}}>Discount </Text>
          <Text style={{width: 215, fontWeight: 'bold'}}>none</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Text style={{color: 'gray', width: 125}}>Total Amount </Text>
          <Text style={{width: 215, fontWeight: 'bold'}}>
            IDR{' '}
            {Number(total)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <Button
            full
            rounded
            bordered
            dark
            style={styles.btn}
            onPress={() => {
              props.navigation.navigate('mybag');
            }}>
            <Text>Reorder</Text>
          </Button>
          <Button full rounded danger style={styles.btn}>
            <Text style={{color: '#fff'}}>Leave Feedback</Text>
          </Button>
        </View>
      </Content>
    </>
  );
};

export default orderdetail;

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
  btn: {
    width: 150,
  },
});
