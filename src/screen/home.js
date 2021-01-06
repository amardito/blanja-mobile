import React, {Component} from 'react';
import {View, Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import Card from '../components/card/cardGrid';

import s from '../styles/homeStyles';

export default class home extends Component {
  render() {
    return (
      <ScrollView horizontal={false}>
        <View style={s.headerHome}>
          <Image
            source={{
              uri:
                'https://s3-alpha-sig.figma.com/img/ff9f/e689/5f92a300e886114d2dde23fbe28ad1be?Expires=1610928000&Signature=SoQmY-9R14Q5WhqCqIXBsYkvnpjalsARFziZOmM93U~k1LU~BzxJkrPCjNuG0iTmGJhm8k8vDHvqYWSbUfx76E-8gTMHzhF-okI4CursL~yqUfG2yBKAYN~icBNILdYNrV9LJXyqrk2U1HloVZx1UqWfC4KA9YEL~zWXjYDeUQof7dMiIeREHuaj4MjtMcwYyjTjyzs0a-WWY0-6bbUW34xQ207HKLhdF8aBo29TtivjqaZqyHuxN9GM-fePDAXB0JHmjdVXNYpHR1FGSlXn8avzK3vBUXMzc~sov4pW469OASilIz6irZp7tDNW4GSVbwGxAiLn0EgLKKv80lzjwA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
            }}
            style={s.imageHeader}
          />
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
            <Card {...this.props} />
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
            <Card {...this.props} />
            <View style={s.lastItems} />
          </ScrollView>
        </View>

        <View style={s.lastContent} />
      </ScrollView>
    );
  }
}
