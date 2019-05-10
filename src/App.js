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
import { createAppContainer } from 'react-navigation';
import {TabNavigator} from "./TabNavigator";

type Props = {};

export default createAppContainer(TabNavigator);
