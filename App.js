import React, {useState, useEffect} from 'react';
import {
  Text,
  StatusBar,
  SafeAreaView,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from './source/components/header/Header';
import Item from './source/components/item/Item';
import ItemMenu from './source/components/itemMenu/ItemMenu';

const MENUS = [
  {title: 'New', value: 'new'},
  {title: 'Top', value: 'top'},
  {title: 'Hot', value: 'hot'},
  {title: 'Rising', value: 'rising'},
  {title: 'Controversial', value: 'controversial'},
];

const App = () => {
  const [data, setData] = useState([]);
  const [menu_select, setMenuSelect] = useState('new');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData(menu_select);
  }, [menu_select]);

  const getData = async end => {
    const response = await fetch(`https://api.reddit.com/r/pics/${end}.json`);
    const {data} = await response.json();
    setData(data.children);
  };

  const renderItem = ({item}) => {
    return <Item item={item} />;
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData(menu_select);
    setRefreshing(false);
  };

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

  const renderItemMenu = ({item}) => {
    const backgroundColor = item.value === menu_select ? '#ff4500' : '#F9f9f9';
    const color = item.value === menu_select ? 'white' : '#666666';
    return (
      <ItemMenu 
        item={item} 
        color={color}
        background_color={backgroundColor}
        onPress={() => setMenuSelect(item.value)}
      />
    );
  };

  const menu = () => {
    return (
      <FlatList
        data={MENUS}
        renderItem={renderItemMenu}
        keyExtractor={item => item.value}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
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

        {menu()}

        {listData()}
      </SafeAreaView>
    </>
  );
};

export default App;
