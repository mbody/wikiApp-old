/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import RNHelloNative from 'react-native-hello-native';

type Props = {};

export default class HistoryScreen extends Component<Props> {

  state = {
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPress}>
          <Text>Say Hello</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onPress = () => {
    RNHelloNative.sayHello('Me', (response)=>Alert.alert('Message from HelloNative', '***  ' + response + ' ***'));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10
  },
});
