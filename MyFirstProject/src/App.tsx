// import * as React from 'react';
import * as React from 'react';
import {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import NLPExample from './examples/NLPQAExample'

export default function App() {
  return (
    <View style={styles.main}>
      {/* <Text>任务中心2</Text> */}
      <NLPExample/>
    </View>
  );
}

const styles = {
  main: {
    padding:10,
    marginTop:40
  }
}
