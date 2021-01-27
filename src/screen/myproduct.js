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
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardProduct from '../components/card/cardProduct';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

class ListProduct extends Component {
  state = {
    products: [],
  };

  getAllProducts = async () => {
    const token = await AsyncStorage.getItem('token');
    const payload = {
      store: JSON.parse(token).store,
    };
    axios
      .post('http://192.168.1.15:1010/api/v1/myproducts', payload, {
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
    const {products} = this.state;
    return (
      <>
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
