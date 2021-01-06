/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {getSingleProductAction} from '../../global/ActionCreators/product';

import s from '../../styles/cardGridStyle';

class cardGrid extends Component {
  render() {
    const {id, image, sold, owner, name, price, badge} = this.props;
    return (
      <TouchableOpacity
        style={s.items}
        onPress={async () => {
          console.log(`\n
          getting item of id : ${String(id)} ...
          \n`);
          await this.props.dispatch(getSingleProductAction(String(id)));
          this.props.navigation.navigate('detail');
        }}>
        <>
          <View style={s.itemsHeader}>
            <Image
              source={{
                uri: image,
              }}
              style={s.itemsImage}
            />
            {badge && <Text style={s.itemsTextBadge}>{badge}</Text>}
          </View>
          <View style={s.starsItems}>
            <MaterialCommunityIcons
              name="star-outline"
              color={'#888'}
              size={18}
            />
            <MaterialCommunityIcons
              name="star-outline"
              color={'#888'}
              size={18}
            />
            <MaterialCommunityIcons
              name="star-outline"
              color={'#888'}
              size={18}
            />
            <MaterialCommunityIcons
              name="star-outline"
              color={'#888'}
              size={18}
            />
            <MaterialCommunityIcons
              name="star-outline"
              color={'#888'}
              size={18}
            />
            <Text style={{color: '#888'}}> ({sold ? sold : 0})</Text>
          </View>
          <Text style={s.itemsOwner}>{owner ? owner : 'loading Data ...'}</Text>
          <Text style={s.itemsName}>{name ? name : 'Loading Data ...'}</Text>
          <Text style={s.itemsPrice}>
            IDR{' '}
            {Number(price)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',') === 'NaN'
              ? 0
              : Number(price)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </>
      </TouchableOpacity>
    );
  }
}

export default connect()(cardGrid);
