import React from 'react';
import {
  Text,
  StatusBar,
  SafeAreaView
} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView 
        style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{textAlign: 'center'}}>
            App Reddit
        </Text>
      </SafeAreaView>
    </>
  );
};

export default App;
