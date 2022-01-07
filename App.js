import React, {useState, useEffect} from 'react';
import {
  Text,
  StatusBar,
  SafeAreaView
} from 'react-native';
import Header from './source/components/header/Header';

const App = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    const response = await fetch("https://api.reddit.com/r/pics/new.json");
    const data = await response.json();
    setData(JSON.stringify(data))
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView 
        style={{flex: 1}}>
        <Header 
          left_item={'chevron-left'}
          // onPressLeft={() => alert('Holi')}
          title={'Title App Reddit'}
        />
        <Text
          style={{textAlign: 'center'}}>
            App Reddit
        </Text>
        <Text
          style={{textAlign: 'center'}}>
            {data}
        </Text>
      </SafeAreaView>
    </>
  );
};

export default App;
