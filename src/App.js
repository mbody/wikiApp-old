/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import { createAppContainer } from 'react-navigation';
import {TabNavigator} from "./TabNavigator";

import {Provider as PaperProvider} from 'react-native-paper';
import {Theme} from "./Theme";

import {Provider as StoreProvider} from 'react-redux';
import {configureStore} from "./redux/configureStore";

const Navigation = createAppContainer(TabNavigator);
const store = configureStore();

export default class App extends Component {

    render() {
        return (
            <StoreProvider store={store}>
                <PaperProvider theme={Theme}>
                    <Navigation/>
                </PaperProvider>
            </StoreProvider>
        );
    }
}
