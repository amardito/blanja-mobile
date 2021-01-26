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
  let {title, category, search, color, size} = route.params;
  const [viewall, setViewall] = useState([]);
  const [sortby, setsortby] = useState(undefined);
  const [sort, setsort] = useState(undefined);
  const [SelectedSort, setSelectedSort] = useState(0);
  //viewall
  useEffect(() => {
    // code to run on component mount
    getViewAll();
  }, [category, search, color, size, sortby, sort]);

  const getViewAll = () => {
    if (
      title === 'View All Items' &&
      search === undefined &&
      color === undefined &&
      size === undefined &&
      sortby === undefined &&
      category === undefined
    ) {
      axios
        .get('http://192.168.1.15:1010/api/v1/search?name=')
        .then(({data}) => {
          setViewall(data.data.values);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (sortby !== undefined) {
        axios
          .get(
            `http://192.168.1.15:1010/api/v1/search?name=${search}&category=${category}&color=${color}&size=${size}&sortby=${sortby}&sort=${sort}`,
          )
          .then(({data}) => {
            setViewall(data.data.values);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get(
            `http://192.168.1.15:1010/api/v1/search?name=${search}&category=${category}&color=${color}&size=${size}`,
          )
          .then(({data}) => {
            setViewall(data.data.values);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const actionSheetRef = createRef();

  return (
    <>
      <View style={styles.head}>
        <NavBar navigation={navigation} title={title} />
        <View style={styles.wrapfilter}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() =>
              navigation.navigate('Filter', {
                search: search,
                category: category,
                color: color !== undefined ? color.split('|') : [],
                size: size !== undefined ? size.split('|') : [],
              })
            }>
            <View style={{marginRight: 15}}>
              <MaterialCommunityIcons
                name="filter-variant"
                color={'#555'}
                size={27}
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
              style={{
                ...styles.btnsheet,
                backgroundColor: SelectedSort === 1 ? 'lightgray' : '#fff',
              }}
              onPress={() => {
                setsortby('popular');
                setsort('ASC');
                setSelectedSort(1);
              }}>
              <Text style={styles.textFilter}>Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.btnsheet,
                backgroundColor: SelectedSort === 2 ? 'lightgray' : '#fff',
              }}
              onPress={() => {
                setsortby('popular');
                setsort('ASC');
                setSelectedSort(2);
              }}>
              <Text style={styles.textFilter}>Newest</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.btnsheet,
                backgroundColor: SelectedSort === 3 ? 'lightgray' : '#fff',
              }}
              onPress={() => {
                setsortby('price');
                setsort('ASC');
                setSelectedSort(3);
              }}>
              <Text style={styles.textFilter}>Price: lowest to high</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.btnsheet,
                backgroundColor: SelectedSort === 4 ? 'lightgray' : '#fff',
              }}
              onPress={() => {
                setsortby('price');
                setsort('DESC');
                setSelectedSort(4);
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
    alignItems: 'center',
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
