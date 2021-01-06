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

import s from '../styles/detailStyle';

export default class detail extends Component {
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
            <Title style={{color: '#888'}}>Detail</Title>
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
            <View style={s.imageItems}>
              <Image
                source={{
                  uri:
                    'https://s3-alpha-sig.figma.com/img/ff9f/e689/5f92a300e886114d2dde23fbe28ad1be?Expires=1610928000&Signature=SoQmY-9R14Q5WhqCqIXBsYkvnpjalsARFziZOmM93U~k1LU~BzxJkrPCjNuG0iTmGJhm8k8vDHvqYWSbUfx76E-8gTMHzhF-okI4CursL~yqUfG2yBKAYN~icBNILdYNrV9LJXyqrk2U1HloVZx1UqWfC4KA9YEL~zWXjYDeUQof7dMiIeREHuaj4MjtMcwYyjTjyzs0a-WWY0-6bbUW34xQ207HKLhdF8aBo29TtivjqaZqyHuxN9GM-fePDAXB0JHmjdVXNYpHR1FGSlXn8avzK3vBUXMzc~sov4pW469OASilIz6irZp7tDNW4GSVbwGxAiLn0EgLKKv80lzjwA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
                }}
                style={s.image}
              />
            </View>
            <View style={s.imageItems}>
              <Image
                source={{
                  uri:
                    'https://s3-alpha-sig.figma.com/img/ff9f/e689/5f92a300e886114d2dde23fbe28ad1be?Expires=1610928000&Signature=SoQmY-9R14Q5WhqCqIXBsYkvnpjalsARFziZOmM93U~k1LU~BzxJkrPCjNuG0iTmGJhm8k8vDHvqYWSbUfx76E-8gTMHzhF-okI4CursL~yqUfG2yBKAYN~icBNILdYNrV9LJXyqrk2U1HloVZx1UqWfC4KA9YEL~zWXjYDeUQof7dMiIeREHuaj4MjtMcwYyjTjyzs0a-WWY0-6bbUW34xQ207HKLhdF8aBo29TtivjqaZqyHuxN9GM-fePDAXB0JHmjdVXNYpHR1FGSlXn8avzK3vBUXMzc~sov4pW469OASilIz6irZp7tDNW4GSVbwGxAiLn0EgLKKv80lzjwA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
                }}
                style={s.image}
              />
            </View>
          </ScrollView>

          <View style={{paddingHorizontal: 16}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <DropDownPicker
                placeholder="Size"
                placeholderStyle={{
                  fontWeight: '600',
                  color: '#333',
                }}
                items={[
                  {label: 'M', value: 'm'},
                  {label: 'L', value: 'l'},
                  {label: 'XL', value: 'xl'},
                ]}
                defaultValue={this.state.size}
                containerStyle={{height: 60, width: 150}}
                style={{
                  marginTop: 12,
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
                items={[
                  {label: 'Black', value: 'black'},
                  {label: 'Red', value: 'red'},
                  {label: 'Green', value: 'green'},
                ]}
                defaultValue={this.state.color}
                containerStyle={{height: 60, width: 150}}
                style={{
                  marginTop: 12,
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
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>H&M</Text>
                <Text style={{fontSize: 12, color: 'grey'}}>
                  Short black dress
                </Text>
              </View>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                IDR 100,000
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
                (0)
              </Text>
            </View>
            <View>
              <Text>
                Short dress in soft cotton jersey with decorative buttons down
                the front and a wide, frill-trimmed square neckline with
                concealed elastication. Elasticated seam under the bust and
                short puff sleeves with a small frill trim.
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
            <Text style={{fontSize: 11, color: 'grey'}}>12 items</Text>
          </View>
          <View style={s.listItems}>
            <ScrollView horizontal={true}>
              <Card {...this.props} />
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
