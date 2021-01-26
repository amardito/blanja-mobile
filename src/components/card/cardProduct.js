/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.1.15:1010/api/v1/',
});

class CardBag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pop: false,
    };
  }
  deleteProduct = async (id) => {
    const token = await AsyncStorage.getItem('token');
    await api
      .delete(`product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).token}`,
        },
      })
      .then(() => {
        this.props.getAll();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  toPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  render() {
    const {id, name, price, qty, image} = this.props;
    return (
      <View style={styles.container}>
        {this.state.pop && (
          <View
            onPress={() => {
              this.setState({
                pop: !this.state.pop,
              });
            }}
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 0,
              left: 0,
              width: '90%',
              flexDirection: 'column',
              alignItems: 'flex-end',
              paddingTop: 5,
              paddingBottom: 55,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('EditProduct', {
                  itemId: id,
                });
              }}
              style={{
                elevation: 10,
                backgroundColor: '#81DE5D',
                padding: 10,
                paddingHorizontal: 23,
                borderRadius: 8,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}>
              <Text style={{fontSize: 15}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Warning !!',
                  'are you sure want delete this product?',
                  [
                    {
                      text: 'yes',
                      onPress: () => {
                        this.deleteProduct(id);
                      },
                    },
                    {
                      text: 'no',
                    },
                  ],
                  {cancelable: true},
                );
              }}
              style={{
                elevation: 10,
                backgroundColor: '#DB3022',
                padding: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}>
              <Text style={{fontSize: 15, color: '#fff'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        <Image
          source={{
            uri: 'http://192.168.1.15:1010/' + image,
            width: 120,
            height: 120,
          }}
          style={styles.img}
        />
        <View style={styles.infobag}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 5,
                maxWidth: 175,
              }}>
              {name}
            </Text>
            <MaterialCommunityIcons
              onPress={() => {
                this.setState({
                  pop: !this.state.pop,
                });
              }}
              style={{padding: 5}}
              name="dots-vertical"
              color={this.state.pop ? 'black' : '#a0a0a0'}
              size={25}
            />
          </View>
          <Text style={{marginRight: 16, color: 'gray'}}>
            Stock : <Text style={{color: 'black', fontSize: 16}}>{qty}</Text>
          </Text>
          <View>
            <Text
              style={{
                fontFamily: 'Metropolis-Bold',
                fontSize: 16,
              }}>
              IDR {this.toPrice(price)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default CardBag;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 120,
    marginBottom: 20,
    marginHorizontal: 15,
    width: '90%',
    elevation: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  img: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infobag: {
    width: '70%',
    paddingHorizontal: 10,
  },
});
