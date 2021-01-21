/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState, createRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import NavBar from '../../components/HeaderBar';
import CardCatalog from '../../components/card/cardCatalog';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ActionSheet from 'react-native-actions-sheet';

const Catalog = ({navigation, route}) => {
  let {title, keyword} = route.params;
  const [viewall, setViewall] = useState([]);
  //viewall
  useEffect(() => {
    // code to run on component mount
    getViewAll();
  }, [navigation]);

  const getViewAll = () => {
    if (title === 'View All Items' || title === '' || title === undefined) {
      title = '';
    }

    axios
      .get(`http://192.168.1.6:1010/api/v1/search?category=${keyword}`)
      .then(({data}) => {
        console.log('view all');
        setViewall(data.data.values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const actionSheetRef = createRef();

  return (
    <>
      <View style={styles.head}>
        <NavBar navigation={navigation} title={title} />
        <View style={styles.wrapfilter}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => navigation.navigate('Filter')}>
            <View style={{marginRight: 15}}>
              <MaterialCommunityIcons
                name="filter-variant"
                color={'#555'}
                size={35}
              />
            </View>
            <Text>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter}>
            <Text
              onPress={() => {
                actionSheetRef.current?.setModalVisible();
              }}>
              Sort
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginHorizontal: windowWidth * 0.04, marginVertical: 10}}>
        <ScrollView>
          {viewall[0] !== undefined &&
            viewall.map(
              ({
                id_product,
                product_name,
                product_by,
                product_price,
                product_img,
              }) => {
                return (
                  <CardCatalog
                    key={id_product}
                    itemId={id_product}
                    name={product_name}
                    brand={product_by}
                    price={product_price}
                    image={product_img.split(',')[0]}
                    navigation={navigation}
                  />
                );
              },
            )}

          <View style={styles.gap} />
        </ScrollView>
        <ActionSheet ref={actionSheetRef}>
          <View style={styles.sort}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 18,
                marginTop: 20,
              }}>
              Sort by
            </Text>
            <TouchableOpacity
              style={styles.btnsheet}
              onPress={() => {
                console.log('rating');
              }}>
              <Text style={styles.textFilter}>Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnsheet}
              onPress={() => {
                console.log('new');
              }}>
              <Text style={styles.textFilter}>Newest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnsheet}
              onPress={() => {
                console.log('Customer review');
              }}>
              <Text style={styles.textFilter}>Customer review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnsheet}
              onPress={() => {
                console.log('price');
              }}>
              <Text style={styles.textFilter}>Price: lowest to high</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnsheet}
              onPress={() => {
                console.log('priceD');
              }}>
              <Text style={styles.textFilter}>Price: highest to low</Text>
            </TouchableOpacity>
          </View>
        </ActionSheet>
      </View>
    </>
  );
};

export default Catalog;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  wrapfilter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    backgroundColor: '#f0f0f0',
  },
  head: {
    backgroundColor: '#fff',
  },
  filter: {
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  gap: {
    marginBottom: 180,
  },
  sort: {
    height: windowHeight * 0.5,
    marginHorizontal: windowWidth * 0.04,
    backgroundColor: '#fff',
  },
  textFilter: {
    fontSize: 16,
    color: 'black',
  },
  btnsheet: {
    marginVertical: 5,
    backgroundColor: '#fff',
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  btnsheetAct: {
    backgroundColor: '#DB3022',
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'center',
  },
  textFilterAct: {
    color: '#fff',
  },
});
