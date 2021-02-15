/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Body, Button, Header, Left, Title} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardAddress from '../../components/card/cardAddress';
import {connect} from 'react-redux';

import s from '../../styles/addresslistStyle';

class Modal extends Component {
  render() {
    const {height, width} = Dimensions.get('window');
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 2,
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

const ListAddress = (props) => {
  const {data} = props.address;
  const [isModal, setisModal] = useState(false);
  const [confModal, setconfModal] = useState({
    titleModal: '',
    descModal: '',
    actBgModal: () => {},
    act1Modal: false,
    act2Modal: false,
    act3Modal: false,
  });

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
              props.navigation.goBack();
            }}>
            <MaterialCommunityIcons
              name="chevron-left"
              color={'#555'}
              size={35}
            />
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              color: '#555',
              textAlign: 'center',
              width: '65%',
              fontSize: 20,
            }}>
            {'Shipping Address'}
          </Title>
        </Body>
      </Header>
      <ScrollView>
        <Text style={s.title}>Shipping Address</Text>

        {data.length ? (
          data.map(
            (
              {
                address_name,
                address_street,
                address_city,
                address_region,
                id_address,
              },
              index,
            ) => {
              return (
                <CardAddress
                  key={index}
                  index={index}
                  id={id_address}
                  name={address_name}
                  street={address_street}
                  city={address_city}
                  region={address_region}
                  deleteAct={true}
                  isModal={(setState) => setisModal(setState)}
                  confModal={(setState) => setconfModal(setState)}
                  {...props}
                />
              );
            },
          )
        ) : (
          <View style={{paddingTop: 5, paddingLeft: 20}}>
            <Text style={{fontSize: 15, color: 'dimgray'}}>
              You don't have a shipping address
            </Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          elevation: 20,
          zIndex: 1,
          bottom: 0,
          backgroundColor: '#fa',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
            props.navigation.navigate('newaddress');
          }}>
          <View style={s.button}>
            <Text>ADD NEW ADDRESS</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const mapStateToProps = ({address}) => {
  return {
    address,
  };
};

export default connect(mapStateToProps)(ListAddress);
