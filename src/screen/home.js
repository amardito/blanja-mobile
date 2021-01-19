import React, {Component} from 'react';
import {View, Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import Card from '../components/card/cardGrid';
import {connect} from 'react-redux';

import s from '../styles/homeStyles';

class home extends Component {
  render() {
    const {newProduct, popularProduct} = this.props.product;
    return (
      <ScrollView horizontal={false}>
        <View style={s.headerHome}>
          <Image source={require('../assets/home.png')} style={s.imageHeader} />
          <Text style={s.textHeader}>Street clothes</Text>
        </View>

        <View style={s.headerContent}>
          <Text style={s.textSubHeader}>New</Text>
          <View style={s.textSpan}>
            <Text>You've never seen it before!</Text>
            <TouchableOpacity>
              <Text>View all</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.listItems}>
          <ScrollView horizontal={true}>
            {newProduct.values &&
              newProduct.values.map(
                ({
                  id_product,
                  product_img,
                  product_sold,
                  product_by,
                  product_name,
                  product_price,
                }) => (
                  <Card
                    {...this.props}
                    key={id_product}
                    id={id_product}
                    image={`http://192.168.1.7:1010${
                      product_img.split(',')[0]
                    }`}
                    sold={product_sold}
                    owner={product_by}
                    name={product_name}
                    price={product_price}
                    badge={'NEW'}
                  />
                ),
              )}
            <View style={s.lastItems} />
          </ScrollView>
        </View>

        <View style={s.headerContent}>
          <Text style={s.textSubHeader}>Popular</Text>
          <View style={s.textSpan}>
            <Text>Tranding items</Text>
            <TouchableOpacity>
              <Text>View all</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.listItems}>
          <ScrollView horizontal={true}>
            {popularProduct.values &&
              popularProduct.values.map(
                ({
                  id_product,
                  product_img,
                  product_sold,
                  product_by,
                  product_name,
                  product_price,
                }) => (
                  <Card
                    {...this.props}
                    key={id_product}
                    id={id_product}
                    image={`http://192.168.1.7:1010${
                      product_img.split(',')[0]
                    }`}
                    sold={product_sold}
                    owner={product_by}
                    name={product_name}
                    price={product_price}
                    badge={false}
                  />
                ),
              )}
            <View style={s.lastItems} />
          </ScrollView>
        </View>

        <View style={s.lastContent} />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({product}) => {
  return {
    product,
  };
};

export default connect(mapStateToProps)(home);
