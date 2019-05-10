import * as React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from "./src/App";
import {name as appName} from './app.json';
import {AppRegistry, Text} from 'react-native';
import {Theme} from "./src/Theme";

export default function Main() {
    return (
        <PaperProvider theme={Theme}>
            <App />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
