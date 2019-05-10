import {DefaultTheme} from "react-native-paper";

export const Colors = {
    ...DefaultTheme.colors,
    primary: '#0073de',
    accent: '#ffda1e',
    white: '#fff',
    gray: '#666',
    background: '#fff'
};

export const Theme = {
    ...DefaultTheme,
    colors: Colors,
};