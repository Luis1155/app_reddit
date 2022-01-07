import React, {useState, useEffect} from 'react';
import {Text, StatusBar, SafeAreaView, FlatList, View, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Header from './source/components/header/Header';
import Item from './source/components/item/Item';

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
    return(
      <Item
        item={item}
      />
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
