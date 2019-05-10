/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Searchbar} from "react-native-paper";

type Props = {};

export default class FavoritesScreen extends Component<Props> {

  state = {
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Favorites Screen</Text>
      </View>
    );
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
