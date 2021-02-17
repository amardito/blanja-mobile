import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {
  getNewProductAction,
  getPopularProductAction,
} from '../../global/ActionCreators/product';
import {authLoginAction} from '../../global/ActionCreators/auth';
import {getMyBagAction} from '../../global/ActionCreators/bag';
import {getCheckoutAction} from '../../global/ActionCreators/checkout';

import {Home, Profile, MyBag, Shop} from '../../screen';

class main extends Component {
  loginAct = async () => {
    if ((await AsyncStorage.getItem('token')) !== null) {
      const loginsAS = JSON.parse(await AsyncStorage.getItem('token')).login_as;
      const idUser = JSON.parse(await AsyncStorage.getItem('token')).id;
      this.props.dispatch(authLoginAction(loginsAS, idUser));
    }
    await SplashScreen.hide();
  };

  componentDidMount = async () => {
    if ((await this.props.product.newProduct.values) === undefined) {
      await this.props.dispatch(getNewProductAction());
    }
    if ((await this.props.product.popularProduct.values) === undefined) {
      await this.props.dispatch(getPopularProductAction());
    }
    if (
      (await AsyncStorage.getItem('belanjaUser')) !== null &&
      (await AsyncStorage.getItem('token')) !== null
    ) {
      await this.props.dispatch(getMyBagAction());
    }
    if (
      (await AsyncStorage.getItem('checkout')) !== null &&
      (await AsyncStorage.getItem('token')) !== null
    ) {
      await this.props.dispatch(getCheckoutAction());
    }
    await this.loginAct();
  };

  render() {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator
        initialRouteName="home"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="shop"
          component={Shop.Main}
          options={{
            tabBarLabel: 'Shop',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="cart-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        {this.props.auth.level !== 'seller' && (
          <Tab.Screen
            name="mybag"
            component={MyBag}
            options={{
              tabBarLabel: 'Bag',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="shopping"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        )}

        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = ({product, auth, bag}) => {
  return {
    product,
    auth,
    bag,
  };
};

export default connect(mapStateToProps)(main);
