/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {getMyBagAction} from '../../global/ActionCreators/bag';
import {getCheckoutAction} from '../../global/ActionCreators/checkout';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import alasql from 'alasql';

import s from '../../styles/cardBagStyle';

class cardBag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.item_qty,
      max: props.max_qty,
      pop: false,
      selected:
        props.checkout.data.filter(
          (data) => data.indexof === this.props.index,
        )[0] !== undefined
          ? true
          : false,
    };
    this.timer = null;
    this.addOne = this.addOne.bind(this);
    this.subOne = this.subOne.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  addOne() {
    if (this.state.number < this.state.max && this.state.selected === false) {
      this.setState({number: this.state.number + 1});
      this.timer = setTimeout(this.addOne, 500);
    }
  }

  subOne() {
    if (this.state.number > 1 && this.state.selected === false) {
      this.setState({number: this.state.number - 1});
      this.timer = setTimeout(this.subOne, 500);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  handleDelete = async () => {
    let newData = alasql(
      'SELECT product_name, id_product, product_img, product_by, size, color, max_qty, product_price, SUM(CAST([item_qty] AS INT)) AS [item_qty] \
    FROM ? GROUP BY id_product, product_img, product_by, product_name, size, color, max_qty, product_price',
      [JSON.parse(await AsyncStorage.getItem('belanjaUser'))],
    );
    newData = newData.filter((item, index) => index !== this.props.index);
    await AsyncStorage.setItem('belanjaUser', JSON.stringify(newData));
    this.props.dispatch(getMyBagAction());
  };

  handleSelect = async () => {
    const {
      size,
      color,
      product_price,
      id_product,
      id_store,
      index,
    } = this.props;
    const prevData = JSON.parse(await AsyncStorage.getItem('checkout'));
    const dataItem = {
      indexof: index,
      product_id: id_product,
      id_store: id_store,
      qty: this.state.number,
      color: color,
      size: size,
      price: product_price * this.state.number,
    };
    let newData = [];
    if (prevData === [] || prevData === null) {
      newData[0] = dataItem;
    } else {
      newData[0] = dataItem;
      newData = prevData.concat(newData);
    }

    await AsyncStorage.setItem('checkout', JSON.stringify(newData));
    this.props.dispatch(getCheckoutAction());
  };

  handleUnSelect = async () => {
    let newData = JSON.parse(await AsyncStorage.getItem('checkout'));
    newData = newData.filter((data) => data.indexof !== this.props.index);
    await AsyncStorage.setItem('checkout', JSON.stringify(newData));
    this.props.dispatch(getCheckoutAction());
  };

  componentDidUpdate() {
    if (
      this.state.selected !==
      (this.props.checkout.data.filter(
        (data) => data.indexof === this.props.index,
      )[0] !== undefined
        ? true
        : false)
    ) {
      this.setState({
        selected:
          this.props.checkout.data.filter(
            (data) => data.indexof === this.props.index,
          )[0] !== undefined
            ? true
            : false,
      });
    }
  }

  render() {
    const {product_name, product_img, size, color, product_price} = this.props;
    return (
      <TouchableHighlight
        style={{width: '100%', marginBottom: 20, borderRadius: 15}}
        onPress={() => {
          if (this.state.pop === false) {
            if (this.state.selected) {
              this.handleUnSelect();
              this.setState({
                selected: !this.state.selected,
              });
            } else {
              this.handleSelect();
              this.setState({
                selected: !this.state.selected,
              });
            }
          }
        }}>
        <>
          <View
            style={{
              width: '100%',
              height: 104,
              borderRadius: 15,
              overflow: 'hidden',
              backgroundColor: '#fff',
              elevation: this.state.selected ? 0 : 12,
              position: 'relative',
            }}>
            {this.state.selected ? (
              <MaterialCommunityIcons
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: 15,
                  right: 30,
                }}
                name="checkbox-marked"
                color={'#DB3022'}
                size={20}
              />
            ) : (
              <MaterialCommunityIcons
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: 15,
                  right: 30,
                }}
                name="checkbox-blank-outline"
                color={'#555'}
                size={20}
              />
            )}
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
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingTop: 5,
                  paddingBottom: 55,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.handleDelete();
                  }}
                  style={{
                    elevation: 10,
                    backgroundColor: '#fff',
                    padding: 10,
                    paddingHorizontal: 15,
                    borderRadius: 8,
                  }}>
                  <Text style={{fontSize: 15}}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Image
                style={s.img}
                source={{
                  uri: `http://192.168.1.2:1010${product_img}`,
                }}
              />
              <View style={{width: '67%', marginTop: 5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 5,
                  }}>
                  <View style={{width: '82%'}}>
                    <Text
                      style={{
                        fontSize: 15,
                        paddingRight: 10,
                      }}>
                      {product_name}
                    </Text>
                    <View style={s.dtlZiseCol}>
                      <Text style={{fontSize: 12}}>
                        Color : <Text style={{fontWeight: '700'}}>{color}</Text>
                      </Text>
                      <Text style={{fontSize: 12}}>
                        Size : <Text style={{fontWeight: '700'}}>{size}</Text>
                      </Text>
                    </View>
                  </View>
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

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 111,
                      height: 36,
                      marginTop: 5,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPressIn={this.subOne}
                      onPressOut={this.stopTimer}>
                      <View
                        style={{
                          height: 36,
                          width: 36,
                          borderRadius: 18,
                          borderColor: '#fff',
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          elevation:
                            this.state.number > 1 &&
                            this.state.selected === false
                              ? 10
                              : 0,
                          backgroundColor: '#fff',
                        }}>
                        <Text
                          style={{
                            fontSize: 30,
                            marginTop: -5,
                            fontWeight: '700',
                            color:
                              this.state.number > 1 ? 'black' : 'lightgray',
                          }}>
                          -
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <Text>{this.state.number}</Text>
                    <TouchableOpacity
                      onPressIn={this.addOne}
                      onPressOut={this.stopTimer}>
                      <View
                        style={{
                          height: 36,
                          width: 36,
                          borderRadius: 18,
                          borderColor: '#fff',
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          elevation:
                            this.state.number < this.state.max &&
                            this.state.selected === false
                              ? 10
                              : 0,
                          backgroundColor: '#fff',
                        }}>
                        <Text
                          style={{
                            fontSize: 30,
                            marginTop: -5,
                            color:
                              this.state.number < this.state.max
                                ? 'black'
                                : 'lightgray',
                          }}>
                          +
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '45%',
                      paddingHorizontal: 10,
                      alignItems: 'flex-end',
                    }}>
                    <Text>
                      IDR{' '}
                      {Number(product_price)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') === 'NaN'
                        ? 0
                        : Number(product_price * this.state.number)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
      </TouchableHighlight>
    );
  }
}

const mapStateToProps = ({checkout}) => {
  return {
    checkout,
  };
};
export default connect(mapStateToProps)(cardBag);
