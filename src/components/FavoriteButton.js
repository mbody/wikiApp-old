import React from 'react';
import {Animated, Text, View, StyleSheet, Easing, TouchableOpacity} from 'react-native';
import {Colors} from "../Theme";
import {IconButton} from "react-native-paper";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialIcons";

type Props = {
    isFavorite: boolean,
    onPress: function
}

export default class FavoriteButton extends React.Component<Props> {
    state = {
        animValue: new Animated.Value(1),  // Initial value for color: 0
    };

    render() {
        let {animValue} = this.state;
        let {isFavorite, title} = this.props;

        const animatedColor = animValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, 0)']
        });

        return (
            <TouchableOpacity accessible={true}
                              accessibilityLabel="Bouton favoris"
                              accessibilityHint={`${isFavorite ? 'Retirer':'Ajouter'} la page ${title} ${isFavorite ? 'de':'à'}  vos favoris`}
                              onPress={this.onButtonPressed}>
                <Animatable.View accessible={true} accessibleLabel='Bouton Favoris' accessibilityRole='button'
                                 accessibleHint='Ajouter cette page en favoris' animation={isFavorite ? 'pulse' : ''}
                                 iterationCount={3}>
                    <Animated.View style={[styles.bg, {backgroundColor: animatedColor}]}>
                        <Icon name={isFavorite ? 'favorite' : 'favorite-border'}
                              color={isFavorite ? Colors.red : Colors.gray}
                              size={30}/>
                    </Animated.View>
                </Animatable.View>
            </TouchableOpacity>
        );
    }


    onButtonPressed = () => {
        this.state.animValue = new Animated.Value(0);
        Animated.spring(this.state.animValue, {toValue: 1, duration: 300}).start();
        this.props.onPress();
    }
}

const styles = StyleSheet.create({
    bg: {
        borderRadius: 20,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
