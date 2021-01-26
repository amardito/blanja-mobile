/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {CategoryFilter, ColorFilter, SizeFilter} from '../../components/filter';
import {Body, Button, Header, Left, Title} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import {useEffect} from 'react';
const Filter = ({navigation, route}) => {
  console.log(route.params);
  const [color, setcolor] = useState(route.params.color);
  const [size, setsize] = useState(route.params.size);
  const [category, setcategory] = useState(route.params.category);

  useEffect(() => {
    setcolor(route.params.color);
    setsize(route.params.size);
  }, [route.params]);

  const selectColor = (newArr) => {
    setcolor(newArr);
  };

  const selectSize = (newArr) => {
    setsize(newArr);
  };

  const unselectColor = (index) => {
    let newData = color;
    newData = newData.filter((value) => Number(value) !== index);
    setcolor(newData);
  };

  const unselectSize = (index) => {
    let newData = size;
    newData = newData.filter((value) => Number(value) !== index);
    setsize(newData);
  };

  return (
    <>
      <Header style={styles.header}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Left>
          <Button
            transparent
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialCommunityIcons
              name="chevron-left"
              color={'#555'}
              size={35}
            />
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              color: '#555',
              textAlign: 'center',
              width: '65%',
              fontSize: 20,
            }}>
            {'Filter'}
          </Title>
        </Body>
      </Header>
      <View style={{paddingTop: 20}}>
        <Text style={styles.headText}>Colors</Text>
        <View style={styles.wrapcolor}>
          <View style={{marginLeft: 10}} />
          <ColorFilter
            title="red"
            index={1}
            handleSelect={(newArr) => {
              selectColor(newArr);
            }}
            unSelect={(index) => {
              unselectColor(index);
            }}
            prevArr={color}
          />
          <ColorFilter
            title="green"
            index={2}
            handleSelect={(newArr) => {
              selectColor(newArr);
            }}
            unSelect={(index) => {
              unselectColor(index);
            }}
            prevArr={color}
          />
          <ColorFilter
            title="blue"
            index={3}
            handleSelect={(newArr) => {
              selectColor(newArr);
            }}
            unSelect={(index) => {
              unselectColor(index);
            }}
            prevArr={color}
          />
          <ColorFilter
            title="yellow"
            index={4}
            handleSelect={(newArr) => {
              selectColor(newArr);
            }}
            unSelect={(index) => {
              unselectColor(index);
            }}
            prevArr={color}
          />
        </View>
        <Text style={styles.headText}>Sizes</Text>
        <View style={styles.wrapcolor}>
          <View style={{marginLeft: 10}} />
          <SizeFilter
            size={'XS'}
            index={1}
            handleSelect={(newArr) => {
              selectSize(newArr);
            }}
            unSelect={(index) => {
              unselectSize(index);
            }}
            prevArr={size}
          />
          <SizeFilter
            size={'SM'}
            index={2}
            handleSelect={(newArr) => {
              selectSize(newArr);
            }}
            unSelect={(index) => {
              unselectSize(index);
            }}
            prevArr={size}
          />
          <SizeFilter
            size={'MD'}
            index={3}
            handleSelect={(newArr) => {
              selectSize(newArr);
            }}
            unSelect={(index) => {
              unselectSize(index);
            }}
            prevArr={size}
          />
          <SizeFilter
            size={'LG'}
            index={4}
            handleSelect={(newArr) => {
              selectSize(newArr);
            }}
            unSelect={(index) => {
              unselectSize(index);
            }}
            prevArr={size}
          />
          <SizeFilter
            size={'XL'}
            index={5}
            handleSelect={(newArr) => {
              selectSize(newArr);
            }}
            unSelect={(index) => {
              unselectSize(index);
            }}
            prevArr={size}
          />
        </View>
        <Text style={styles.headText}>Category</Text>
        <View style={styles.wrapcolor}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              style={styles.categorySelector}
              onPress={() => setcategory(undefined)}>
              <CategoryFilter
                category="All"
                selected={category === undefined ? true : false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categorySelector}
              onPress={() => setcategory(1)}>
              <CategoryFilter
                category="T-Shirt"
                selected={category === 1 ? true : false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categorySelector}
              onPress={() => setcategory(2)}>
              <CategoryFilter
                category="Short"
                selected={category === 2 ? true : false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categorySelector}
              onPress={() => setcategory(3)}>
              <CategoryFilter
                category="Jacket"
                selected={category === 3 ? true : false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categorySelector}
              onPress={() => setcategory(4)}>
              <CategoryFilter
                category="Pants"
                selected={category === 4 ? true : false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categorySelector}
              onPress={() => setcategory(5)}>
              <CategoryFilter
                category="Shoes"
                selected={category === 5 ? true : false}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: 0,
          width: '100%',
          paddingHorizontal: 30,
          paddingVertical: 10,
          backgroundColor: '#fff',
          elevation: 10,
        }}>
        <TouchableOpacity
          style={{
            width: '100%',
            paddingVertical: 10,
            backgroundColor: '#DB3022',
            elevation: 3,
            borderRadius: 100,
          }}
          onPress={() => {
            navigation.navigate('catalog', {
              ...route.params,
              category: category,
              color: color.join('|') === '' ? undefined : color.join('|'),
              size: size.join('|') === '' ? undefined : size.join('|'),
            });
          }}>
          <Text style={{alignSelf: 'center', color: '#fff', fontSize: 20}}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Filter;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
  headText: {
    fontSize: 20,
    marginLeft: 20,
  },
  wrapcolor: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 10,
    paddingVertical: 15,
    width: windowWidth,
    flexWrap: 'wrap',
    marginVertical: 15,
  },
  categorySelector: {
    marginHorizontal: 5,
    width: '30.3%',
    marginBottom: 10,
  },
});
