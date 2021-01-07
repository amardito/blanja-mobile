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

import s from '../styles/detailStyle';

class detail extends Component {
  constructor() {
    super();
    this.state = {
      size: null,
      color: null,
      like: false,
    };
  }

  render() {
    const shadowOpt = {
      width: Dimensions.get('window').width,
      height: 60,
      color: '#000',
      border: 2,
      radius: 5,
      opacity: 0.2,
      x: 0,
      y: -4,
      // style: {marginVertical: 5},
    };
    const {
      // id_product,
      product_img,
      product_name,
      product_by,
      product_price,
      product_sold,
      product_desc,
    } =
      this.props.product.singleProduct &&
      this.props.product.singleProduct.product;

    const {color, size} =
      this.props.product.singleProduct && this.props.product.singleProduct;

    const colorItems = [];
    color !== undefined &&
      color.map(({color_id, color}) => {
        const payload = {label: color, value: color_id};
        return colorItems.push(payload);
      });

    const sizeItems = [];
    size !== undefined &&
      size.map(({size_id, size}) => {
        const payload = {label: size, value: size_id};
        return sizeItems.push(payload);
      });
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
            <Title style={{color: '#888'}}>{product_by}</Title>
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
        <ScrollView style={{backgroundColor: '#fcfcfc'}}>
          <ScrollView horizontal={true}>
            {product_img !== undefined &&
              product_img.map((value, index) => (
                <View style={s.imageItems} key={index}>
                  <Image
                    source={{
                      uri: `http://18.233.157.119:8000${value}`,
                    }}
                    style={s.image}
                  />
                </View>
              ))}
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
                  borderColor: this.state.color !== null ? 'red' : 'dimgray',
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
                  style={{fontSize: 24, fontWeight: 'bold', paddingRight: 8}}>
                  {product_name}
                </Text>
                <Text style={{fontSize: 18, color: 'grey'}}>{product_by}</Text>
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
                ({product_sold})
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 18}}>{product_desc}</Text>
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
            <Text style={{fontSize: 11, color: 'grey'}}>12 items</Text>
          </View>
          <View style={s.listItems}>
            <ScrollView horizontal={true}>
              <Card {...this.props} badge={false} />
              <Card {...this.props} />
              <Card {...this.props} />
              <View style={s.lastItems} />
            </ScrollView>
          </View>
          <View style={s.lastContent} />
        </ScrollView>

        <Footer
          style={{
            height: 60,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}>
          <BoxShadow setting={shadowOpt}>
            <FooterTab style={{backgroundColor: 'white'}}>
              <Button>
                <TouchableOpacity>
                  <View
                    style={{
                      height: 48,
                      width: 343,
                      borderRadius: 25,
                      backgroundColor: '#DB3022',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white'}}>ADD TO CART</Text>
                  </View>
                </TouchableOpacity>
              </Button>
            </FooterTab>
          </BoxShadow>
        </Footer>
      </>
    );
  }
}

const mapStateToProps = ({product}) => {
  return {
    product,
  };
};

export default connect(mapStateToProps)(detail);
