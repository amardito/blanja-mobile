import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class profile extends Component {
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
