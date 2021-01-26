/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

const ColorFilter = ({title, index, handleSelect, unSelect, prevArr}) => {
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
      onPress={() => {
        if (selected) {
          unSelect(index);
        } else {
          let newData = [];
          newData[0] = index;
          newData = prevArr.concat(newData);
          handleSelect(newData);
        }
      }}
      style={{
        borderWidth: selected ? 1 : 0,
        borderColor: 'red',
        marginHorizontal: 5,
        padding: selected ? 4 : 5,
        borderRadius: 100,
      }}>
      <View
        style={{
          height: 36,
          width: 36,
          borderRadius: 36 / 2,
          backgroundColor: `${title}`,
        }}
      />
    </TouchableOpacity>
  );
};

export default ColorFilter;
