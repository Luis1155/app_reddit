import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';

const Item = ({item}) => {
  const image = item.data.thumbnail.includes('http')
    ? {uri: item.data.thumbnail}
    : require('../../assets/no_pic.png')
  const date = moment(item.data.created*1000).fromNow()

  return(
    <TouchableOpacity style={style.container}>
      <Image
        source={image}
        resizeMode={'cover'}
        style={style.image}
      />
      <View style={style.info}>
        <View style={style.sub_container}>
          <Text style={style.text}>
            Posted by {item.data.author}
          </Text>
          <Text style={style.text}>
            {date}
          </Text>
        </View>
        <Text numberOfLines={3} style={style.title}>
          {item.data.title}
        </Text>
        <View style={[style.sub_container, {justifyContent:'flex-end'}]}>
          <Text style={style.text}>
            Score: {item.data.score}✨
          </Text>
          <Text style={[style.text, {paddingLeft: 10}]}>
            Comments: {item.data.num_comments}💬
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Item

const style = StyleSheet.create({
  container: {
    margin:5, 
    height: 110, 
    borderColor:'#bbb',
    flexDirection:'row', 
    borderBottomWidth: 0.5, 
  },
  title: {
    fontSize:18, 
    color: '#666',
    fontWeight:'bold', 
  },
  info: {
    width:'75%', 
    height:'90%', 
    paddingHorizontal:10, 
    justifyContent:'space-around'
  },
  sub_container: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  image: {
    width:'25%', 
    height:'90%'
  },
  text: {
    fontSize: 15,
  }

});