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
  let {title, category, search, color, size, SortBy, Sort} = route.params;
  const [viewall, setViewall] = useState([]);
  const [sortby, setsortby] = useState(SortBy);
  const [sort, setsort] = useState(Sort);
  const [SelectedSort, setSelectedSort] = useState(
    sortby === 'popular' ? 1 : sortby === 'latest' && 2,
  );

  //viewall
  useEffect(() => {
    // code to run on component mount
    setViewall([]);
    getViewAll();
  }, [category, search, color, size, sortby, sort, SelectedSort]);

  const getViewAll = () => {
    if (title === 'View All Items') {
      axios
        .get(
          `http://192.168.1.2:1010/api/v1/search?name=&sortby=${sortby}&sort=${sort}`,
        )
        .then(({data}) => {
          setViewall(data.data.values);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (title === 'New' || title === 'Popular') {
      axios
        .get(
          `http://192.168.1.2:1010/api/v1/search?name=&sortby=${sortby}&sort=${sort}`,
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
          `http://192.168.1.2:1010/api/v1/search?name=${search}&category=${category}&color=${color}&size=${size}&sortby=${sortby}&sort=${sort}`,
        )
        .then(({data}) => {
          setViewall(data.data.values);
        })
        .catch((err) => {
          console.log(err);
        });
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
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons
                name="filter-variant"
                color={'#555'}
                size={27}
              />
            </View>
            <Text style={{fontSize: 15}}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => {
              actionSheetRef.current?.setModalVisible();
            }}>
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons
                name="compare-vertical"
                color={'#555'}
                size={27}
              />
            </View>
            <Text style={{fontSize: 15}}>Sort</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginHorizontal: windowWidth * 0.04, marginVertical: 10}}>
        {viewall.length ? (
          <ScrollView>
            {viewall[0] !== undefined &&
              viewall.map(
                ({
                  id_product,
                  product_name,
                  product_by,
                  product_price,
                  product_img,
                  category_id,
                }) => {
                  return (
                    <CardCatalog
                      key={id_product}
                      itemId={id_product}
                      name={product_name}
                      brand={product_by}
                      price={product_price}
                      image={product_img.split(',')[0]}
                      category={category_id}
                      navigation={navigation}
                    />
                  );
                },
              )}

            <View style={styles.gap} />
          </ScrollView>
        ) : (
          <View style={{paddingTop: 5, paddingRight: 30}}>
            <Text style={{fontSize: 20, color: 'gray', alignSelf: 'center'}}>
              Getting some result data for {title}
            </Text>
          </View>
        )}
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
                backgroundColor: SelectedSort === 1 ? '#DB3022' : '#fff',
              }}
              onPress={() => {
                setsortby('popular');
                setsort('DESC');
                setSelectedSort(1);
                setViewall([]);
              }}>
              <Text
                style={{
                  ...styles.textFilter,
                  color: SelectedSort === 1 ? '#fff' : '#333',
                }}>
                Popular
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.btnsheet,
                backgroundColor: SelectedSort === 2 ? '#DB3022' : '#fff',
              }}
              onPress={() => {
                setsortby('latest');
                setsort('DESC');
                setSelectedSort(2);
                setViewall([]);
              }}>
              <Text
                style={{
                  ...styles.textFilter,
                  color: SelectedSort === 2 ? '#fff' : '#333',
                }}>
                Newest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.btnsheet,
                backgroundColor: SelectedSort === 3 ? '#DB3022' : '#fff',
              }}
              onPress={() => {
                setsortby('price');
                setsort('ASC');
                setSelectedSort(3);
                setViewall([]);
              }}>
              <Text
                style={{
                  ...styles.textFilter,
                  color: SelectedSort === 3 ? '#fff' : '#333',
                }}>
                Price: lowest to high
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.btnsheet,
                backgroundColor: SelectedSort === 4 ? '#DB3022' : '#fff',
              }}
              onPress={() => {
                setsortby('price');
                setsort('DESC');
                setSelectedSort(4);
                setViewall([]);
              }}>
              <Text
                style={{
                  ...styles.textFilter,
                  color: SelectedSort === 4 ? '#fff' : '#333',
                }}>
                Price: highest to low
              </Text>
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
    backgroundColor: '#fff',
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
  },
  textFilter: {
    fontSize: 16,
    color: 'black',
  },
  btnsheet: {
    marginVertical: 5,
    backgroundColor: '#fff',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: windowWidth * 0.04 + 10,
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
