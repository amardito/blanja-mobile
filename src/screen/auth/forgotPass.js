import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Container, Form, Item, Input, Label, Button} from 'native-base';

import s from '../../styles/authStyle';

export default class forgotPass extends Component {
  render() {
    return (
      <View style={s.containerFull}>
        <ScrollView>
          <Text style={s.headerText}> Forgot Password </Text>
          <Container style={s.formInput}>
            <Form>
              <Text style={s.instructionText}>
                Please, enter your email address. You will receive a link to
                create a new password via email.
              </Text>
              <Item floatingLabel style={s.inputBox}>
                <Label style={s.labelStyle} floatBack={3}>
                  Email
                </Label>
                <Input style={s.inputStyle} />
              </Item>
              <View style={s.formAction}>
                <Button style={s.buttonStyle} rounded danger block>
                  <Text style={s.whiteText}>SEND</Text>
                </Button>
              </View>
            </Form>
          </Container>
        </ScrollView>
      </View>
    );
  }
}
