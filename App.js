import React, {useState, useEffect} from 'react';
import {StatusBar, SafeAreaView, FlatList, BackHandler, Alert} from 'react-native';
import WebView from 'react-native-webview';

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
  const [post_select, setPostSelect] = useState('');

  useEffect(() => {
    getData(menu_select);
  }, [menu_select]);

  useEffect(() => {
    const backAction = () => {
      post_select ?
        setPostSelect('')
      :
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const getData = async end => {
    const response = await fetch(`https://api.reddit.com/r/pics/${end}.json`);
    const {data} = await response.json();
    setData(data.children);
  };

  const renderItem = ({item}) => {
    return (
      <Item 
        item={item}
        onPress={() => setPostSelect(item)}
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData(menu_select);
    setRefreshing(false);
  };

  const renderListData = () => {
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

  const renderMenu = () => {
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

  const renderWebView = () => {
    const url = `https://www.reddit.com/${post_select.data.permalink}`
    return(
      <WebView
        source={{ uri: url }}
      />
    )
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <Header
          left_item={post_select ? 'angle-left' : ''}
          onPressLeft={() => setPostSelect('')}
          title={post_select ? post_select.data.title : 'App Reddit'}
        />
        {
          post_select ?
          <>
            {renderWebView()}
          </>
          :
          <>
            {renderMenu()}
            {renderListData()}
          </>
        }
      </SafeAreaView>
    </>
  );
};

export default App;
