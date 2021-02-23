import Home from './home';
import Auth from './auth';
import Profile from './profile';
import MainScreen from '../components/navigation';
import Detail from './detail';
import MyBag from './mybag';
import Checkout from './checkout';
import ShippingAddress from './shippingAddress';
import MyOrder from './myOrder';
import MyProduct from './myproduct';
import AddProduct from './addproduct';
import EditProduct from './editproduct';
import Shop from './shop';
import SettingProfile from './setting';
import Chat from './chat';
import ChatList from './chatlist';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';

import PushNotification from 'react-native-push-notification';
import {showNotification} from '../notif';
import {useSocket} from '../utils/context/SocketProvider';

const Navigator = () => {
  const socket = useSocket();
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'notif',
        channelName: 'My Notification channel',
        channelDescription: 'A channel to categories your notification',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createchannel returned '${created}'`),
    );
    PushNotification.getChannels((channel_ids) => {
      console.log(channel_ids);
    });
  }, []);

  useEffect(() => {
    const channel = 'notif';
    if (socket === undefined) {
      return;
    }
    socket.on('notification', ({title, message}) => {
      showNotification(title, message, channel);

      console.log(message);
    });

    return () => socket.off('connect');
  }, [socket]);

  const Stack = createStackNavigator();
  return (
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
          name="chatlist"
          component={ChatList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="chat"
          component={Chat}
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
  );
};

export default Navigator;

export {Home, Profile, MyBag, Shop};
