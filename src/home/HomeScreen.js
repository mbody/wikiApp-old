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

export default class HomeScreen extends Component<Props> {

  state = {
    searchQuery: '',
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <View style={styles.container}>

        <Searchbar
            placeholder="Rechercher"
            onChangeText={query => { this.setState({ searchQuery: query }); }}
            value={searchQuery}
        />
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
