import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Auth, MainScreen, Detail} from './src/screen';

export default class App extends Component {
  componentDidMount = () => {
    SplashScreen.hide();
  };

  render() {
    const Stack = createStackNavigator();
    return (
      <>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="mainscreen"
              component={MainScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="signup"
              component={Auth.SignUp}
              options={{
                title: '',
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                  backgroundColor: 'transparent',
                },
              }}
            />
            <Stack.Screen
              name="signin"
              component={Auth.SignIn}
              options={{
                title: '',
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                  backgroundColor: 'transparent',
                },
              }}
            />
            <Stack.Screen
              name="forgotpass"
              component={Auth.ForgotPass}
              options={{
                title: '',
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                  backgroundColor: 'transparent',
                },
              }}
            />
            <Stack.Screen
              name="detail"
              component={Detail}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
