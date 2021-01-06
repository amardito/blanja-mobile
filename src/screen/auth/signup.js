import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Container, Form, Item, Input, Label, Button} from 'native-base';

import s from '../../styles/authStyle';

export default class signup extends Component {
  render() {
    return (
      <View style={s.containerFull}>
        <ScrollView>
          <Text style={s.headerText}> Sign Up </Text>
          <Container style={s.formInput}>
            <Form>
              <Item floatingLabel style={s.inputBox}>
                <Label style={s.labelStyle} floatBack={3}>
                  Username
                </Label>
                <Input style={s.inputStyle} />
              </Item>

              <Item floatingLabel style={s.inputBox}>
                <Label style={s.labelStyle} floatBack={3}>
                  Email
                </Label>
                <Input style={s.inputStyle} />
              </Item>

              <Item floatingLabel style={s.inputBox}>
                <Label style={s.labelStyle} floatBack={3}>
                  Password
                </Label>
                <Input style={s.inputStyle} />
              </Item>
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
