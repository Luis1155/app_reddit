import React, {useState, useEffect} from 'react';
import {Text, StatusBar, SafeAreaView, FlatList, View, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Header from './source/components/header/Header';

const App = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  
  useEffect(() => {
    getData('hot');
  }, []);
  
  const getData = async (end) => {
    const response = await fetch(`https://api.reddit.com/r/pics/${end}.json`);
    const {data} = await response.json();
    setData(data.children);
  };
  
  const renderItem = ({item}) => {
    const image = item.data.thumbnail.includes('http')
      ? {uri: item.data.thumbnail}
      : require('./source/assets/no_pic.png')
    // const date = 

    return(
      <TouchableOpacity style={{height: 110, margin:5, flexDirection:'row', borderBottomWidth: 0.5, borderColor:'#bbb'}}>
        <Image
          source={image}
          resizeMode={'cover'}
          style={{width:'25%', height:'90%', }}
        />
        <View style={{width:'75%', height:'90%', paddingHorizontal:10, justifyContent:'space-around'}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{fontSize:15}}>
              Posted by {item.data.author}
            </Text>
            <Text style={{fontSize:15}}>
              {moment(item.data.created*1000).fromNow()}
            </Text>
          </View>
          <Text numberOfLines={3} style={{fontSize:18, fontWeight:'bold', color: '#666'}}>
            {item.data.title}
          </Text>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{fontSize:15}}>
              Score: {item.data.score}✨
            </Text>
            <Text style={{fontSize:15}}>
              Comments: {item.data.num_comments}💬
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  
  const onRefresh = () => {
    setRefreshing(true);
    getData('rising')
    setRefreshing(false);
  }

  const listData = () => {
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.data.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <Header
          left_item={'angle-left'}
          onPressLeft={() => alert('Holi')}
          title={'Title App Reddit'}
        />

        {
          listData()
        }
      </SafeAreaView>
    </>
  );
};

export default App;
