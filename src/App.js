/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { createAppContainer } from 'react-navigation';
import {TabNavigator} from "./TabNavigator";

import {ActivityIndicator, Provider as PaperProvider} from 'react-native-paper';
import {Theme} from "./Theme";

import {Provider as StoreProvider} from 'react-redux';
import {store, persistor} from "./redux/configureStore";

const Navigation = createAppContainer(TabNavigator);

export default class App extends Component {

    render() {
        return (
            <StoreProvider store={store}>
                <PaperProvider theme={Theme}>
                    <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                        <Navigation />
                    </PersistGate>
                </PaperProvider>
            </StoreProvider>
        );
    }
}
