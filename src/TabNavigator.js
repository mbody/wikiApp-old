import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import HistoryScreen from "./history/HistoryScreen";
import HomeScreen from "./home/HomeScreen";
import {Colors} from "./Theme";
import FavoritesScreen from "./favorites/FavoritesScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as React from 'react';
import SettingsScreen from "./settings/SettingsScreen";

const getDefaultOptions = (routeName) => {
    let options={};
    switch (routeName) {
        case 'Home':
            options  = {
                iconName : `md-home`,
                label:`Accueil`,
                tabColor: '#222'
            };
            break;
        case 'Favorites':
            options  = {
                iconName : `ios-heart`,
                label:`Favoris`,
                tabColor: '#282828'
            };
            break;
        case 'History':
            options  = {
                iconName : `ios-time`,
                label:`Historique`,
                tabColor: '#222'
            };
            break;
        case 'Settings':
            options  = {
                iconName : `ios-settings`,
                label:`Paramètres`,
                tabColor: '#282828'
            };
            break;
    }
    return options;
};

const defaultNavigationOptions = ({ navigation }) => {
    const {routeName} = navigation.state;
    const options = getDefaultOptions(routeName);

    return {
        tabBarIcon: ({ focused, horizontal, tintColor }) => (<Ionicons name={options.iconName} size={25} color={tintColor} />),
        tabBarLabel: options.label,
        tabBarColor: options.tabColor
    }
};

export const TabNavigator =  createMaterialBottomTabNavigator({
    Home: { screen: HomeScreen },
    Favorites: { screen: FavoritesScreen },
    History: { screen: HistoryScreen },
    Settings: { screen: SettingsScreen },
}, {
    defaultNavigationOptions,
    initialRouteName: 'Home',
    activeColor: Colors.white,
    inactiveColor: Colors.gray,
    barStyle: { backgroundColor: Colors.backdrop },
});