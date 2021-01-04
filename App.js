import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home, Auth} from './src/screen';

export default class App extends Component {
  componentDidMount = () => {
    SplashScreen.hide();
  };

  render() {
    // const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    return (
      <>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <NavigationContainer>
          {/* <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Shop" component={ShopScreen} />
            <Tab.Screen name="Bag" component={ShopScreen} />
            <Tab.Screen name="Favorites" component={ShopScreen} />
            <Tab.Screen name="Profile" component={ShopScreen} />
          </Tab.Navigator> */}
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signin"
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
              name="Signup"
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
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
