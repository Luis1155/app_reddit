import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = ({
  left_item,
  right_item,
  onPressLeft,
  onPressRight,
  title }) => {

    
  const generateLateralIcon= (icon, func) => {
    if (!icon) {
      return (
        <View style={style.lateral} />
        );
    }
    return (
      <TouchableOpacity
        style={style.lateral}
        onPress={func}
        >
        <Icon
          name={icon}
          size={25}
          color={'black'}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={style.container}>
      {
        generateLateralIcon(
          left_item,
          onPressLeft
        )
      }
      <View style={style.center}>
        <Text style={style.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {
        generateLateralIcon(
          right_item,
          onPressRight
        )
      }
    </View>
  )
}

export default Header

const style = StyleSheet.create({
  container: {
    height: '6%',
    flexDirection: 'row',
  },
  lateral: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color:'black'
  }
});
