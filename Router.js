import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/global/store';

import {
  Auth,
  MainScreen,
  Detail,
  Checkout,
  ShippingAddress,
  MyOrder,
  MyProduct,
  AddProduct,
  Shop,
  SettingProfile,
  EditProduct,
} from './src/screen';

import {SocketProvider} from './src/utils/context/SocketProvider';

export default class App extends Component {
  render() {
    const Stack = createStackNavigator();
    return (
      <Provider store={store}>
        <SocketProvider>
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

              <Stack.Screen
                name="setting"
                component={SettingProfile}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="checkout"
                component={Checkout}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="addresslist"
                component={ShippingAddress.ListAddress}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="changeaddress"
                component={ShippingAddress.ChangeAddress}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="newaddress"
                component={ShippingAddress.AddAddress}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="selectaddress"
                component={ShippingAddress.SelectAddress}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="myorder"
                component={MyOrder.OrderList}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="orderdetail"
                component={MyOrder.OrderDetail}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="myproduct"
                component={MyProduct}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="addproduct"
                component={AddProduct}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="editproduct"
                component={EditProduct}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="catalog"
                component={Shop.Catalog}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Search"
                component={Shop.Search}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Filter"
                component={Shop.Filter}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SocketProvider>
      </Provider>
    );
  }
}
