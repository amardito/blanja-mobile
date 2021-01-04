import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Container, Form, Item, Input, Label, Button} from 'native-base';

import s from '../../styles/authStyle';

export default class signup extends Component {
  render() {
    return (
      <View style={s.containerFull}>
        <Text style={s.headerText}> Sign Up </Text>
        <ScrollView>
          <Container style={s.formInput}>
            <Form>
              <View style={s.inputBox}>
                <Item stackedLabel>
                  <Label>Username</Label>
                  <Input style={s.inputStyle} />
                </Item>
              </View>
              <View style={s.inputBox}>
                <Item stackedLabel>
                  <Label>Email</Label>
                  <Input style={s.inputStyle} />
                </Item>
              </View>
              <View style={s.inputBox}>
                <Item stackedLabel>
                  <Label>Password</Label>
                  <Input style={s.inputStyle} />
                </Item>
              </View>
              <View style={s.formAction}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Signin');
                  }}>
                  <Text>Already have an account ?</Text>
                </TouchableOpacity>
                <Button style={s.buttonStyle} rounded danger block>
                  <Text style={s.whiteText}>SIGN UP</Text>
                </Button>
              </View>
            </Form>
          </Container>
        </ScrollView>
      </View>
    );
  }
}
