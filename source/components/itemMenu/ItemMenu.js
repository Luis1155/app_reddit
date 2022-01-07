import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const ItemMenu = ({item, background_color, color, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style.container, {backgroundColor: background_color}]}>
      <Text style={[style.title, {color: color}]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemMenu;

const style = StyleSheet.create({
  container: {
    height: 50,
    width: 120,
    borderWidth: 0.5,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
