/* eslint-disable react-native/no-inline-styles */
import {Body, Button, Header, Left, Right, Title} from 'native-base';
import React, {Component} from 'react';
import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import s from '../styles/bagStyle';

export default class mybag extends Component {
  render() {
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
        <View style={{paddingHorizontal: 14}}>
          <View style={{marginTop: 33}}>
            <Text style={s.titleScreen}>My Bag</Text>
          </View>
          <View style={{marginTop: 24}}>
            <View style={s.cardBag}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Image
                  style={s.img}
                  source={{
                    uri:
                      'https://s3-alpha-sig.figma.com/img/ff9f/e689/5f92a300e886114d2dde23fbe28ad1be?Expires=1610928000&Signature=SoQmY-9R14Q5WhqCqIXBsYkvnpjalsARFziZOmM93U~k1LU~BzxJkrPCjNuG0iTmGJhm8k8vDHvqYWSbUfx76E-8gTMHzhF-okI4CursL~yqUfG2yBKAYN~icBNILdYNrV9LJXyqrk2U1HloVZx1UqWfC4KA9YEL~zWXjYDeUQof7dMiIeREHuaj4MjtMcwYyjTjyzs0a-WWY0-6bbUW34xQ207HKLhdF8aBo29TtivjqaZqyHuxN9GM-fePDAXB0JHmjdVXNYpHR1FGSlXn8avzK3vBUXMzc~sov4pW469OASilIz6irZp7tDNW4GSVbwGxAiLn0EgLKKv80lzjwA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
                  }}
                />
                <View style={{width: '65%'}}>
                  <Text>T-Shirt</Text>
                  <View style={s.dtlZiseCol}>
                    <Text style={{fontSize: 11}}>Color : Grey</Text>
                    <Text style={{fontSize: 11}}>Size : L</Text>
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
                        marginTop: 14,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity>
                        <View
                          style={{
                            height: 36,
                            width: 36,
                            borderRadius: 18,
                            borderColor: 'black',
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 30, marginTop: -5}}>-</Text>
                        </View>
                      </TouchableOpacity>
                      <Text>1</Text>
                      <TouchableOpacity>
                        <View
                          style={{
                            height: 36,
                            width: 36,
                            borderRadius: 18,
                            borderColor: 'black',
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 30, marginTop: -5}}>+</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: '50%',
                        paddingLeft: 10,
                        alignItems: 'flex-end',
                      }}>
                      <Text>Rp.100.000</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}
