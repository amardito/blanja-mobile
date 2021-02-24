/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label,
  Textarea,
  Left,
  Body,
  Right,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

import PushNotification from 'react-native-push-notification';
import {showNotification} from '../notif';

import {
  getNewProductAction,
  getPopularProductAction,
} from '../global/ActionCreators/product';

class EditProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product_name: '',
      product_price: '',
      qty: '',
      category_id: null,
      color: [],
      size: [],
      product_desc: '',
      product_img: [],
      taken_pic: {},
    };
  }

  getProduct = () => {
    const {itemId} = this.props.route.params;

    axios
      .get('http://34.203.227.174:8000/api/v1' + `/product/${itemId}`)
      .then(({data}) => {
        const {product, color, size} = data.data;
        console.log('product', product);
        console.log('color', color);
        console.log('size', size);
        this.setState({
          product_name: product.product_name,
          product_price: String(product.product_price),
          qty: String(product.product_qty),
          category_id: product.category_id,
          color: color.map(({color_id}) => {
            return color_id;
          }),
          size: size.map(({size_id}) => {
            return size_id;
          }),
          product_desc: product.product_desc,
          product_img: product.product_img,
        });
      });
  };

  chooseFile = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((images) => {
        this.setState({product_img: images});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  takePicture = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    })
      .then((images) => {
        this.setState({taken_pic: images});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  postProduct = async () => {
    const {itemId} = this.props.route.params;
    const channel = 'notif';
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(token).token}`,
        'Content-type': 'multipart/form-data',
      },
    };
    const data = new FormData();

    data.append('product_name', this.state.product_name);
    data.append('product_by', JSON.parse(token).store);
    data.append('product_qty', this.state.qty);
    data.append('category_id', this.state.category_id);
    data.append('product_price', this.state.product_price);
    data.append('product_desc', this.state.product_desc);
    data.append('product_sold', 0);
    this.state.color[0] !== undefined &&
      data.append('color_id', this.state.color.join(','));
    this.state.size[0] !== undefined &&
      data.append('size_id', this.state.size.join(','));
    this.state.taken_pic.path !== undefined &&
      data.append('product_img', {
        name: this.state.taken_pic.path.split('/').pop(),
        type: this.state.taken_pic.mime,
        uri: this.state.taken_pic.path,
      });
    if (this.state.product_img[0].path !== undefined) {
      for (let i = 0; i < this.state.product_img.length; i++) {
        data.append('product_img', {
          name: this.state.product_img[i].path.split('/').pop(),
          type: this.state.product_img[i].mime,
          uri: this.state.product_img[i].path,
        });
      }
    }

    axios
      .put(
        'http://34.203.227.174:8000/api/v1' + `/product/update/${itemId}`,
        data,
        config,
      )
      .then(() => {
        showNotification(
          'Notification',
          `Edit product ${this.state.product_name} Successfully`,
          channel,
        );
        this.props.dispatch(getNewProductAction());
        this.props.dispatch(getPopularProductAction());
        this.props.navigation.navigate('profile');
      })
      .catch(() => {
        ToastAndroid.show('Failed update product', 0.0001);
      });
  };

  componentDidMount() {
    this.getProduct();
    PushNotification.createChannel(
      {
        channelId: 'notif',
        channelName: 'My Notification channel',
        channelDescription: 'A channel to categories your notification',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createchannel returned '${created}'`),
    );
    PushNotification.getChannels((channel_ids) => {
      console.log(channel_ids);
    });
  }

  render() {
    const {
      product_name,
      product_price,
      qty,
      product_desc,
      product_img,
    } = this.state;

    const categoryItems = [
      {label: 'T-Shirt', value: '1'},
      {label: 'Short', value: '2'},
      {label: 'Jacket', value: '3'},
      {label: 'Pants', value: '4'},
      {label: 'Shoes', value: '5'},
    ];

    const colorItems = [
      {label: 'Red', value: '1'},
      {label: 'Green', value: '2'},
      {label: 'Blue', value: '3'},
      {label: 'Yellow', value: '4'},
    ];

    const sizeItems = [
      {label: 'xs', value: '1'},
      {label: 'sm', value: '2'},
      {label: 'md', value: '3'},
      {label: 'lg', value: '4'},
      {label: 'xl', value: '5'},
    ];

    console.log('state', this.state);

    return (
      <Container style={styles.container}>
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
              {'Edit Product'}
            </Title>
          </Body>
          <Right>
            <Button transparent>
              <MaterialCommunityIcons name="magnify" color={'#888'} size={25} />
            </Button>
          </Right>
        </Header>
        <Content style={{paddingHorizontal: 8}}>
          <ScrollView>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Form style={{width: '95%', alignItems: 'center'}}>
                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.labelStyle} floatBack={3}>
                    Product Name
                  </Label>
                  <Input
                    style={styles.inputStyle}
                    name="product_name"
                    value={product_name}
                    onChangeText={(e) => this.setState({product_name: e})}
                    defaultValue={this.state.email}
                  />
                </Item>

                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.labelStyle} floatBack={3}>
                    Price
                  </Label>
                  <Input
                    keyboardType={'number-pad'}
                    style={styles.inputStyle}
                    name="price"
                    value={product_price}
                    onChangeText={(e) => this.setState({product_price: e})}
                    defaultValue={this.state.email}
                  />
                </Item>

                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.labelStyle} floatBack={3}>
                    Quantity
                  </Label>
                  <Input
                    keyboardType={'number-pad'}
                    style={styles.inputStyle}
                    name="qty"
                    value={qty}
                    onChangeText={(e) => this.setState({qty: e})}
                    defaultValue={this.state.email}
                  />
                </Item>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}>
                  <DropDownPicker
                    placeholder="Select your color product"
                    placeholderStyle={{
                      fontWeight: '600',
                      color: '#333',
                    }}
                    items={colorItems}
                    defaultValue={this.state.color}
                    containerStyle={{width: '49%'}}
                    style={{
                      ...styles.inputBox,
                    }}
                    arrowColor={this.state.color !== null ? 'black' : 'dimgray'}
                    itemStyle={{
                      paddingLeft: 14,
                    }}
                    labelStyle={{
                      color: 'dimgray',
                      fontSize: 17,
                    }}
                    dropDownStyle={{
                      backgroundColor: '#fff',
                      width: '100%',
                      paddingHorizontal: 0,
                    }}
                    dropDownMaxHeight={600}
                    activeItemStyle={{backgroundColor: '#f0f0f0'}}
                    activeLabelStyle={{color: 'black'}}
                    multiple={true}
                    multipleText={'%d item selected'}
                    min={1}
                    max={10}
                    onChangeItem={(item) =>
                      this.setState({
                        color: item,
                      })
                    }
                  />

                  <DropDownPicker
                    placeholder="Select your size product"
                    placeholderStyle={{
                      fontWeight: '600',
                      color: '#333',
                    }}
                    items={sizeItems}
                    defaultValue={this.state.size}
                    containerStyle={{width: '49%'}}
                    style={{
                      ...styles.inputBox,
                    }}
                    arrowColor={this.state.size !== null ? 'black' : 'dimgray'}
                    itemStyle={{
                      paddingLeft: 14,
                    }}
                    labelStyle={{
                      color: 'dimgray',
                      fontSize: 17,
                    }}
                    dropDownStyle={{
                      backgroundColor: '#fff',
                      width: '100%',
                      paddingHorizontal: 0,
                    }}
                    dropDownMaxHeight={600}
                    activeItemStyle={{backgroundColor: '#f0f0f0'}}
                    activeLabelStyle={{color: 'black'}}
                    multiple={true}
                    multipleText={'%d item selected'}
                    min={1}
                    max={10}
                    onChangeItem={(item) =>
                      this.setState({
                        size: item,
                      })
                    }
                  />
                </View>

                <DropDownPicker
                  placeholder="Select your category product"
                  placeholderStyle={{
                    fontWeight: '600',
                    color: '#333',
                  }}
                  items={categoryItems}
                  defaultValue={this.state.category_id}
                  containerStyle={{width: '100%'}}
                  style={{
                    ...styles.inputBox,
                    elevation: 0,
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    borderBottomWidth: 2,
                  }}
                  arrowColor={
                    this.state.category_id !== null ? 'black' : 'dimgray'
                  }
                  itemStyle={{
                    justifyContent: 'center',
                  }}
                  labelStyle={{
                    color: 'dimgray',
                    fontSize: 17,
                  }}
                  dropDownStyle={{
                    backgroundColor: '#fff',
                    width: '100%',
                    paddingHorizontal: 0,
                  }}
                  dropDownMaxHeight={600}
                  activeItemStyle={{backgroundColor: '#f0f0f0'}}
                  activeLabelStyle={{color: 'black'}}
                  onChangeItem={(item) =>
                    this.setState({
                      category_id: item.value,
                    })
                  }
                />

                <Textarea
                  style={{
                    ...styles.inputBox,
                    width: '100%',
                    elevation: 0,
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    borderBottomWidth: 2,
                    fontSize: 16,
                    paddingLeft: 15,
                    height: 150,
                  }}
                  rowSpan={5}
                  placeholder="Description"
                  name="description"
                  value={product_desc}
                  onChangeText={(text) => {
                    this.setState({product_desc: text});
                  }}
                />

                <Text style={{fontSize: 20, color: 'dimgray'}}>
                  Product Image
                </Text>

                {product_img[0] !== undefined ||
                this.state.taken_pic.path !== undefined ? (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        marginBottom: 5,
                      }}>
                      <ScrollView horizontal={true}>
                        {product_img[0].path !== undefined
                          ? product_img.map((item) => {
                              return (
                                <Image
                                  key={product_img.indexOf(item)}
                                  source={{
                                    uri:
                                      product_img.length !== 0 ? item.path : '',
                                  }}
                                  style={styles.imageStyle}
                                />
                              );
                            })
                          : product_img.map((item, index) => {
                              return (
                                <Image
                                  key={index}
                                  source={{
                                    uri: 'http://34.203.227.174:8000/' + item,
                                  }}
                                  style={styles.imageStyle}
                                />
                              );
                            })}
                      </ScrollView>
                    </View>
                    {this.state.taken_pic.path !== undefined && (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginBottom: 10,
                          marginTop: 5,
                        }}>
                        <Image
                          source={{uri: this.state.taken_pic.path}}
                          style={styles.imageStyle}
                        />
                      </View>
                    )}
                  </>
                ) : (
                  <View style={{marginVertical: 20}}>
                    <Text style={{fontSize: 20, alignSelf: 'center'}}>
                      Add some image
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.btnSection}
                  onPress={this.chooseFile}>
                  <Text style={styles.btnText}>Choose Image</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.btnSection}
                  onPress={this.takePicture}>
                  <Text style={styles.btnText}>Take Picture</Text>
                </TouchableOpacity>
              </Form>

              <Button
                danger
                full
                rounded
                style={{marginTop: 15, marginBottom: 20}}
                onPress={this.postProduct}>
                <Text style={{color: '#fff'}}> SUBMIT </Text>
              </Button>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(EditProduct);

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },

  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 20,
    elevation: 5,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },

  imageStyle: {
    width: 200,
    height: 200,
    // width: 100,
    // height: 100,
    margin: 5,
    // borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  inputBox: {
    backgroundColor: '#ffffff',
    elevation: 6,
    borderRadius: 8,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 15,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
    bottom: 0,
    top: 0,
    height: 70,
  },
  labelStyle: {
    paddingHorizontal: 12,
    paddingTop: 15,
    marginBottom: 0,
    paddingBottom: 0,
  },
  inputStyle: {paddingVertical: 0, height: 'auto'},
});
