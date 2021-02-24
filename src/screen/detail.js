/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  StatusBar,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Footer,
  FooterTab,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Fontisto';
import Card from '../components/card/cardGrid';
import {BoxShadow} from 'react-native-shadow';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {getMyBagAction} from '../global/ActionCreators/bag';
import axios from 'axios';

import {BASE_URL} from '@env';

const api = axios.create({
  baseURL: BASE_URL,
});

import s from '../styles/detailStyle';

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

class detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: null,
      color: null,
      like: false,
      refData: [],
      isModal: false,
      titleModal: '',
      descModal: '',
      actBgModal: () => {},
      act1Modal: false,
      act2Modal: false,
      act3Modal: false,
    };
  }

  // EROR when getting reference item

  getAll = () => {
    console.log(this.props.route.params);
    const search = `?category=${this.props.route.params.category}`;
    api
      .get(`search${search}`)
      .then(({data}) => {
        this.setState({
          refData: data.data.values,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleBag = async () => {
    const {
      id_user,
      id_product,
      product_img,
      product_name,
      product_by,
      product_price,
      product_qty,
    } =
      this.props.product.isFulfilled &&
      this.props.product.singleProduct.product;
    const {color, size} = this.state;
    const prevData = JSON.parse(await AsyncStorage.getItem('belanjaUser'));
    const dataItem = {
      id_store: id_user,
      product_img: product_img[0],
      product_name: product_name,
      product_by: product_by,
      product_price: product_price,
      item_qty: 1,
      max_qty: product_qty,
      id_product: id_product,
      size: size === null ? 'none' : size,
      color: color === null ? 'none' : color,
    };

    let newData = [];
    if (prevData === [] || prevData === null) {
      newData[0] = dataItem;
    } else {
      newData[0] = dataItem;
      newData = prevData.concat(newData);
    }

    await AsyncStorage.setItem('belanjaUser', JSON.stringify(newData));
    this.props.dispatch(getMyBagAction());
    const {navigation} = this.props;
    this.setState({
      isModal: true,
      titleModal: 'Add Items Success',
      descModal: 'Do you want to see mybag right now?',
      act1Modal: {
        text: 'Back',
        onpress: () => {
          this.setState({isModal: false});
          navigation.navigate('mainscreen');
        },
      },
      act2Modal: {
        text: 'No',
        onpress: () => this.setState({isModal: false}),
      },
      act3Modal: {
        text: 'Yes',
        onpress: () => {
          this.setState({isModal: false});
          navigation.navigate('mybag');
        },
      },
      actBgModal: () => {
        this.setState({isModal: false});
      },
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.product.singleProduct !== this.props.product.singleProduct) {
      this.getAll();
    }
  };

  render() {
    const shadowOpt = {
      width: Dimensions.get('window').width,
      height: 60,
      color: '#000',
      border: 2,
      radius: 0,
      opacity: 0.2,
      x: 0,
      y: -3,
      // style: {marginVertical: 5},
    };
    const {
      product_img,
      product_name,
      product_by,
      product_price,
      product_sold,
      product_desc,
      id_user,
      user_name,
    } =
      this.props.product.isFulfilled &&
      this.props.product.singleProduct.product;

    const {color, size} =
      this.props.product.singleProduct && this.props.product.singleProduct;

    const {isFulfilled} = this.props.product;

    let colorItems = [];
    isFulfilled &&
      color.map(({color}) => {
        const payload = {label: color, value: color};
        return colorItems.push(payload);
      });

    let sizeItems = [];
    isFulfilled &&
      size.map(({size}) => {
        const payload = {label: size, value: size};
        return sizeItems.push(payload);
      });

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
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <MaterialCommunityIcons
                name="chevron-left"
                color={'#888'}
                size={35}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{color: '#888'}}>{isFulfilled && product_by}</Title>
          </Body>
          <Right>
            <Button transparent>
              <MaterialCommunityIcons
                name="share-variant"
                color={'#888'}
                size={25}
              />
            </Button>
          </Right>
        </Header>
        {isFulfilled ? (
          <>
            <ScrollView style={{backgroundColor: '#fcfcfc'}}>
              <ScrollView horizontal={true}>
                {isFulfilled &&
                  product_img.map((value, index) => {
                    return (
                      <View style={s.imageItems} key={index}>
                        <Image
                          source={{
                            uri: `http://34.203.227.174:8000${value}`,
                          }}
                          style={s.image}
                        />
                      </View>
                    );
                  })}
              </ScrollView>

              <View style={{paddingHorizontal: 16}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // paddingRight: 0,
                  }}>
                  <DropDownPicker
                    placeholder="Size"
                    placeholderStyle={{
                      fontWeight: '600',
                      color: '#333',
                    }}
                    items={sizeItems}
                    defaultValue={this.state.size}
                    containerStyle={{height: 60, width: 145}}
                    style={{
                      marginTop: 12,
                      width: '90%',
                      borderColor: this.state.size !== null ? 'red' : 'dimgray',
                    }}
                    arrowColor={this.state.size !== null ? 'black' : 'dimgray'}
                    itemStyle={{
                      justifyContent: 'center',
                    }}
                    labelStyle={{
                      color: 'dimgray',
                    }}
                    dropDownStyle={{
                      backgroundColor: '#fff',
                      marginTop: 10,
                      width: '90%',
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                    }}
                    activeItemStyle={{backgroundColor: '#f0f0f0'}}
                    activeLabelStyle={{color: 'black'}}
                    selectedLabelStyle={{color: 'black'}}
                    onChangeItem={(item) =>
                      this.setState({
                        size: item.value,
                      })
                    }
                  />
                  <DropDownPicker
                    placeholder="color"
                    placeholderStyle={{
                      fontWeight: '600',
                      color: '#333',
                    }}
                    items={colorItems}
                    defaultValue={this.state.color}
                    containerStyle={{height: 60, width: 145}}
                    style={{
                      marginTop: 12,
                      width: '90%',
                      borderColor:
                        this.state.color !== null ? 'red' : 'dimgray',
                    }}
                    arrowColor={this.state.color !== null ? 'black' : 'dimgray'}
                    itemStyle={{
                      justifyContent: 'center',
                    }}
                    labelStyle={{
                      color: 'dimgray',
                    }}
                    dropDownStyle={{
                      backgroundColor: '#fff',
                      marginTop: 10,
                      width: '90%',
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                    }}
                    activeItemStyle={{backgroundColor: '#f0f0f0'}}
                    activeLabelStyle={{color: 'black'}}
                    selectedLabelStyle={{color: 'black'}}
                    onChangeItem={(item) =>
                      this.setState({
                        color: item.value,
                      })
                    }
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        like: !this.state.like,
                      });
                    }}>
                    <View
                      style={{
                        marginTop: 16,
                        height: 36,
                        width: 36,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: this.state.like ? 'red' : 'dimgray',
                        borderWidth: 1,
                        borderRadius: 16,
                        backgroundColor: '#ffffff',
                        elevation: 4,
                      }}>
                      {this.state.like ? (
                        <Icon name="heart" color={'red'} />
                      ) : (
                        <Icon name="heart-alt" color={'dimgray'} />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginTop: 22,
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '60%'}}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        paddingRight: 8,
                      }}>
                      {isFulfilled && product_name}
                    </Text>
                    <Text style={{fontSize: 18, color: 'grey'}}>
                      {isFulfilled && product_by}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      width: '40%',
                      textAlign: 'right',
                    }}>
                    IDR{' '}
                    {Number(product_price)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') === 'NaN'
                      ? 0
                      : Number(product_price)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 5}}>
                  <MaterialCommunityIcons
                    name="star-outline"
                    color={'#888'}
                    size={18}
                  />
                  <MaterialCommunityIcons
                    name="star-outline"
                    color={'#888'}
                    size={18}
                  />
                  <MaterialCommunityIcons
                    name="star-outline"
                    color={'#888'}
                    size={18}
                  />
                  <MaterialCommunityIcons
                    name="star-outline"
                    color={'#888'}
                    size={18}
                  />
                  <MaterialCommunityIcons
                    name="star-outline"
                    color={'#888'}
                    size={18}
                  />
                  <Text style={{fontSize: 13, marginLeft: 3, color: '#9B9B9B'}}>
                    ({isFulfilled && product_sold})
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize: 18}}>
                    {isFulfilled && product_desc}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 24,
                }}>
                <Text style={{fontSize: 18, fontWeight: '700'}}>
                  You can also like this
                </Text>
                <Text style={{fontSize: 11, color: 'grey'}}>
                  {this.state.refData.length} items
                </Text>
              </View>
              <View style={s.listItems}>
                <ScrollView horizontal={true}>
                  {this.state.refData[0] &&
                    this.state.refData.map(
                      ({
                        id_product,
                        product_img,
                        product_sold,
                        product_by,
                        product_name,
                        product_price,
                        category_id,
                      }) => (
                        <Card
                          {...this.props}
                          key={id_product}
                          id={id_product}
                          image={`http://34.203.227.174:8000${
                            product_img.split(',')[0]
                          }`}
                          sold={product_sold}
                          owner={product_by}
                          name={product_name}
                          price={product_price}
                          category={category_id}
                          badge={false}
                          onPress={() => {
                            colorItems = [];
                            sizeItems = [];
                          }}
                        />
                      ),
                    )}

                  <View style={s.lastItems} />
                </ScrollView>
              </View>
              <View style={s.lastContent} />
            </ScrollView>
            {this.props.auth.isLogin && this.props.auth.level !== 'seller' && (
              <Footer
                style={{
                  height: 60,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}>
                <BoxShadow setting={shadowOpt}>
                  <FooterTab
                    style={{
                      backgroundColor: 'white',
                      paddingHorizontal: 15,
                      alignItems: 'center',
                      elevation: 10,
                    }}>
                    <TouchableOpacity
                      style={{width: '80%'}}
                      onPress={() => {
                        this.handleBag();
                      }}>
                      <View
                        style={{
                          height: 48,
                          borderRadius: 25,
                          backgroundColor: '#DB3022',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: 'white'}}>ADD TO CART</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        ToastAndroid.show('redirect to chat', 0.0001);
                        this.props.navigation.navigate('chat', {
                          receiverName: user_name,
                          receiverID: id_user,
                        });
                      }}>
                      <View
                        style={{
                          height: 48,
                          width: 48,
                          borderRadius: 25,
                          backgroundColor: '#DB3022',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MaterialCommunityIcons
                          name="forum"
                          color={'white'}
                          size={24}
                        />
                      </View>
                    </TouchableOpacity>
                  </FooterTab>
                </BoxShadow>
              </Footer>
            )}
          </>
        ) : (
          <View
            style={{
              width: '100%',
              height: 400,
              flexDirection: 'row',
              paddingLeft: 30,
            }}>
            <Text style={{alignSelf: 'center', fontSize: 25}}>
              Loading data ...
            </Text>
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = ({product, bag, auth}) => {
  return {
    product,
    bag,
    auth,
  };
};

export default connect(mapStateToProps)(detail);
