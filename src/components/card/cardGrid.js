/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import s from '../../styles/cardGridStyle';

export default class cardGrid extends Component {
  render() {
    return (
      <TouchableOpacity
        style={s.items}
        onPress={() => {
          this.props.navigation.navigate('detail');
        }}>
        <>
          <View style={s.itemsHeader}>
            <Image
              source={{
                uri:
                  'https://s3-alpha-sig.figma.com/img/ff9f/e689/5f92a300e886114d2dde23fbe28ad1be?Expires=1610928000&Signature=SoQmY-9R14Q5WhqCqIXBsYkvnpjalsARFziZOmM93U~k1LU~BzxJkrPCjNuG0iTmGJhm8k8vDHvqYWSbUfx76E-8gTMHzhF-okI4CursL~yqUfG2yBKAYN~icBNILdYNrV9LJXyqrk2U1HloVZx1UqWfC4KA9YEL~zWXjYDeUQof7dMiIeREHuaj4MjtMcwYyjTjyzs0a-WWY0-6bbUW34xQ207HKLhdF8aBo29TtivjqaZqyHuxN9GM-fePDAXB0JHmjdVXNYpHR1FGSlXn8avzK3vBUXMzc~sov4pW469OASilIz6irZp7tDNW4GSVbwGxAiLn0EgLKKv80lzjwA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
              }}
              style={s.itemsImage}
            />
            <Text style={s.itemsTextBadge}>NEW</Text>
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
            <Text style={{color: '#888'}}> (0)</Text>
          </View>
          <Text style={s.itemsOwner}>Owner Shop</Text>
          <Text style={s.itemsName}>
            Baju mantap enak nyaman dipakai nyobain text panjang yahahaha
          </Text>
          <Text style={s.itemsPrice}>IDR 200.000</Text>
        </>
      </TouchableOpacity>
    );
  }
}
