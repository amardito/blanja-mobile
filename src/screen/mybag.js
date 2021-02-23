/* eslint-disable react-native/no-inline-styles */
import {Body, Button, Header, Left, Right, Title} from 'native-base';
import React, {Component} from 'react';
import {
  StatusBar,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {clearCheckoutAction} from '../global/ActionCreators/checkout';
import alasql from 'alasql';

import s from '../styles/bagStyle';
import CardBag from '../components/card/cardBag';

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

class mybag extends Component {
  constructor(props) {
    super(props);
    const {auth, navigation} = props;
    this.state = {
      isModal: false,
      titleModal: '',
      descModal: '',
      actBgModal: () => {},
      act1Modal: false,
      act2Modal: false,
      act3Modal: false,
    };
    this._auth = async () => {
      console.log(`\n
      try access bag screen, Validating auth:
      `);
      try {
        auth.isLogin
          ? (console.log('      success'), this.setState({isModal: false}))
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
    const {
      isModal,
      titleModal,
      descModal,
      act1Modal,
      act2Modal,
      act3Modal,
      actBgModal,
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
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 14,
              marginBottom: 150,
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
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'red',
                      paddingVertical: 5,
                    }}
                    onPress={() => {
                      this.props.dispatch(clearCheckoutAction());
                      this.setState({
                        getData: [],
                      });
                    }}>
                    Unselect All
                  </Text>
                </TouchableOpacity>
                <Text>Selected ( {this.props.checkout.data.length} )</Text>
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
        <View style={s.addcart}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              marginHorizontal: 10,
              marginVertical: 20,
            }}>
            <Text style={{color: 'gray'}}>Total amount:</Text>
            <Text>
              IDR{' '}
              {Number(total)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              // postHistory();
              // navigation.navigate('Success');
              this.props.checkout.data[0] !== undefined &&
                this.props.navigation.navigate('checkout');
            }}>
            <View style={s.btn}>
              <Text style={{color: '#fff'}}>CHECK OUT</Text>
            </View>
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
