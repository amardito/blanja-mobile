/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const SizeFilter = ({size, index, handleSelect, unSelect, prevArr}) => {
  const [selected, setselected] = useState(false);
  useEffect(() => {
    const cekSelect = prevArr.filter((value) => Number(value) === index);
    if (cekSelect[0]) {
      setselected(true);
    } else {
      setselected(false);
    }
  }, [prevArr, index]);

  return (
    <TouchableOpacity
      style={{
        ...styles.wrap,
        backgroundColor: selected ? '#DB3022' : '#fff',
        borderColor: selected ? '#DB3022' : 'dimgray',
      }}
      onPress={() => {
        if (selected) {
          unSelect(index);
        } else {
          let newData = [];
          newData[0] = index;
          newData = prevArr.concat(newData);
          handleSelect(newData);
        }
      }}>
      <Text style={{...styles.font, color: selected ? '#fff' : '#000'}}>
        {size}
      </Text>
    </TouchableOpacity>
  );
};

export default SizeFilter;

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: 'dimgray',
    marginHorizontal: 5,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  font: {
    fontSize: 15,
  },
});
