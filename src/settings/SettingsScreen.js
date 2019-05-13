/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Button, Searchbar, Title} from "react-native-paper";
import I18n from '../i18n/i18n'

type Props = {};

export default class SettingsScreen extends Component<Props> {

  state = {
  };

  render() {
    return (
      <View style={styles.container}>
        <Title>{I18n.t("settings.selectLanguage")}</Title>
        <Button onPress={this.onSwitchTo('fr')}>Français</Button>
        <Button onPress={this.onSwitchTo('en')}>English</Button>
      </View>
    );
  }

  onSwitchTo = (newLocale) => () => {
    I18n.locale = newLocale;
    this.forceUpdate();
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
