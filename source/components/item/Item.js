import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';

const Item = ({item, onPress}) => {
  const have_image = item.data.thumbnail.includes('http')
  const image = have_image
    ? {uri: item.data.thumbnail}
    : require('../../assets/no_pic.png')
  const date = moment(item.data.created*1000).fromNow()

  return(
    <TouchableOpacity style={style.container} onPress={onPress}>
      <View style={style.container_image}>
        <Image
          source={image}
          resizeMode={'cover'}
          style={have_image ? style.image : {width:'70%', height:'60%'}}
        />
      </View>
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
          ✨ Score: {item.data.score}
          </Text>
          <Text style={[style.text, {paddingLeft: 10}]}>
          💬 Comments: {item.data.num_comments}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Item

const style = StyleSheet.create({
  container: {
    marginHorizontal:5, 
    height: 110, 
    borderColor:'#bbb',
    flexDirection:'row', 
    borderBottomWidth: 0.5, 
  },
  container_image: {
    width:'25%',
    alignItems:'center',
    justifyContent:'center',
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
    width:'100%', 
    height:'90%'
  },
  text: {
    fontSize: 15,
  }
});