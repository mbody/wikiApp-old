import {DefaultTheme} from "react-native-paper";

export const Colors = {
    ...DefaultTheme.colors,
    primary: '#0073de',
    accent: '#ffda1e',
    white: '#fff',
    gray: '#666',
    background: '#fff',
    error: '#fc0000'

};

export const Theme = {
    ...DefaultTheme,
    colors: Colors,
};