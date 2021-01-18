/* eslint-disable react-native/no-inline-styles */
import {Body, Button, Header, Left, Right, Title} from 'native-base';
import React, {Component} from 'react';
import {
  StatusBar,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {clearMyBagAction} from '../global/ActionCreators/bag';
import alasql from 'alasql';

import s from '../styles/bagStyle';
import CardBag from '../components/card/cardBag';

class mybag extends Component {
  constructor(props) {
    super(props);
    const {auth, navigation} = props;
    this._auth = async () => {
      console.log(`\n
      try access bag screen, Validating auth:
      `);
      try {
        auth.isLogin
          ? console.log('      success')
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

  componentDidMount = async () => {
    await this._auth();
  };

  render() {
    const dataItem = this.props.bag.data;
    const data =
      dataItem[0] !== undefined
        ? alasql(
            'SELECT product_name, id_product, product_img, product_by, size, color, max_qty, product_price, SUM(CAST([item_qty] AS INT)) AS [item_qty] \
          FROM ? GROUP BY id_product, product_img, product_by, product_name, size, color, max_qty, product_price',
            [dataItem],
          )
        : [];
    const {isFulfilled} = this.props.bag;
    const total =
      this.props.checkout.data[0] !== undefined
        ? alasql(
            'SELECT SUM(CAST([price] AS INT)) AS [price] \
          FROM ? ',
            [this.props.checkout.data],
          )[0].price
        : 0;
    console.log(this.props.checkout.data[0]);
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
          <View
            style={{
              paddingHorizontal: 14,
            }}>
            <View
              style={{
                marginTop: 25,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={s.titleScreen}>My Bag</Text>
              <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <TouchableHighlight>
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'red',
                      paddingVertical: 5,
                    }}
                    onPress={() => {
                      this.props.dispatch(clearMyBagAction());
                      this.setState({
                        getData: [],
                      });
                    }}>
                    Delete All
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={s.cardList}>
              {data[0] !== undefined ? (
                isFulfilled &&
                data.map(
                  (
                    {
                      product_name,
                      id_product,
                      product_img,
                      size,
                      color,
                      product_price,
                      max_qty,
                      item_qty,
                    },
                    index,
                  ) => {
                    return (
                      <CardBag
                        key={index}
                        index={index}
                        product_name={product_name}
                        id_product={id_product}
                        product_img={product_img}
                        size={size}
                        color={color}
                        product_price={product_price}
                        max_qty={max_qty}
                        item_qty={item_qty}
                      />
                    );
                  },
                )
              ) : (
                <Text> Add some product on your bag </Text>
              )}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 40,
            paddingVertical: 5,
            backgroundColor: '#fff',
            elevation: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text style={{fontSize: 16, color: 'dimgray'}}>Total amount :</Text>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              IDR{' '}
              {Number(total)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: '#DB3022',
              paddingVertical: 10,
              borderRadius: 20,
              marginBottom: 5,
              elevation: 6,
            }}>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 16}}>
              CHECK OUT
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const mapStateToProps = ({auth, bag, checkout}) => {
  return {
    auth,
    bag,
    checkout,
  };
};

export default connect(mapStateToProps)(mybag);