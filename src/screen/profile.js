/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {connect} from 'react-redux';
import {authLogoutAction} from '../global/ActionCreators/auth';

class profile extends Component {
  constructor(props) {
    super(props);
    const {auth, navigation} = props;
    this._auth = async () => {
      console.log('try access profile screen, Validating token:');
      try {
        auth.isLogin._W ? console.log('sucess') : navigation.navigate('signup');
      } catch (error) {
        // Error saving data
        console.log(error);
      }
    };
  }

  componentDidMount() {
    this._auth();
  }
  render() {
    return (
      <View>
        <Text
          style={{marginTop: 25}}
          onPress={() => {
            this.props.navigation.navigate('signup');
          }}>
          textInComponent
        </Text>
      </View>
    );
  }
}
const mapStateToProps = ({auth}) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(profile);
