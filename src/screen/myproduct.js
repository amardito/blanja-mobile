/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
} from 'native-base';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardProduct from '../components/card/cardProduct';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

class Modal extends Component {
  render() {
    const {height, width} = Dimensions.get('window');
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

class ListProduct extends Component {
  state = {
    products: [],
    isModal: false,
    confModal: {
      titleModal: '',
      descModal: '',
      actBgModal: () => {},
      act1Modal: false,
      act2Modal: false,
      act3Modal: false,
    },
  };

  getAllProducts = async () => {
    const token = await AsyncStorage.getItem('token');
    const payload = {
      store: JSON.parse(token).store,
    };
    axios
      .post('http://192.168.1.2:1010/api/v1/myproducts', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({data}) => {
        this.setState({products: data.data.values});
      })
      .catch((err) => {
        if (err.response.data.message === 'data not found') {
          this.setState({products: []});
        } else {
          console.error(err);
        }
      });
  };

  refresh = () => {
    this.getAllProducts();
  };

  componentDidMount() {
    this.getAllProducts();
  }

  render() {
    const {products, isModal, confModal} = this.state;
    return (
      <>
        {isModal && (
          <Modal
            title={confModal.titleModal}
            desc={confModal.descModal}
            background={confModal.actBgModal}
            button1={confModal.act1Modal}
            button2={confModal.act2Modal}
            button3={confModal.act3Modal}
          />
        )}
        <Container>
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
              <Title
                style={{
                  color: '#555',
                  textAlign: 'center',
                  width: '100%',
                  fontSize: 20,
                  left: 50,
                }}>
                {'My Product'}
              </Title>
            </Body>
            <Right>
              <Button transparent>
                <MaterialCommunityIcons
                  name="magnify"
                  color={'#888'}
                  size={25}
                />
              </Button>
            </Right>
          </Header>
          <Content style={{backgroundColor: '#f0f0f0', marginVertical: 20}}>
            {products[0] === undefined ? (
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 20, alignSelf: 'center'}}>
                  Add some Product
                </Text>
              </View>
            ) : (
              products.map(
                (
                  {
                    id_product,
                    product_name,
                    product_price,
                    product_img,
                    product_qty,
                  },
                  index,
                ) => {
                  let img = product_img.split(',')[0];
                  // console.log(img);
                  return (
                    <CardProduct
                      key={index}
                      id={id_product}
                      name={product_name}
                      price={product_price}
                      qty={product_qty}
                      image={img}
                      navigation={this.props.navigation}
                      getAll={this.getAllProducts}
                      isModal={(setState) => this.setState(setState)}
                      confModal={(setState) =>
                        this.setState({confModal: setState})
                      }
                    />
                  );
                },
              )
            )}
          </Content>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(ListProduct);

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
});
