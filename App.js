import React from 'react';
import {
  Text,
  StatusBar,
  SafeAreaView
} from 'react-native';
import Header from './source/components/header/Header';

const App = () => {
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
      </SafeAreaView>
    </>
  );
};

export default App;
