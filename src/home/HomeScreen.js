/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {ActivityIndicator, Searchbar, Card, Paragraph, Title} from "react-native-paper";
import {Colors} from "../Theme";
import {wikiService} from "../services/WikiService";

type Props = {};

export default class HomeScreen extends Component<Props> {

    state = {
        searchQuery: 'nelson mandela',
        searchPending: false,
    };

    render() {
        const {searchQuery, searchPending, errorMsg, searchResultPages} = this.state;
        return (
            <View style={styles.container}>

                <Searchbar
                    placeholder="Rechercher"
                    onChangeText={query => {
                        this.setState({searchQuery: query});
                    }}
                    onIconPress={this.onSearch}
                    value={searchQuery}
                />

                <View style={styles.searchResultsContainer}>
                    {searchPending && <ActivityIndicator/>}
                    {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
                    {searchResultPages && (searchResultPages.length === 0 ?
                        <Text>Aucun résultat trouvé :-( </Text>
                        :
                        <FlatList data={searchResultPages} renderItem={this.renderPageCard}>

                        </FlatList>)
                    }
                </View>

            </View>
        );
    }

    renderPageCard = ({item, index}) => {
        return <Card key={'card_' + index} style={styles.card}>
            <Card.Title title={item.title} subtitle={item.description}
                        left={(props) => item.thumbnail &&
                            <Image {...props} source={{uri: item.thumbnail.source}} style={{height: 40, width: 40}}/>}
            />
        </Card>
    }

    onSearch = async () => {
        const {searchQuery} = this.state;
        if (!searchQuery || searchQuery.trim().length === 0) return;

        this.setState({searchPending: true, searchResultPages: false, errorMsg: false});

        try {
            const searchResultPages = await wikiService.search(searchQuery.trim());
            this.setState({searchPending: false, searchResultPages})
        } catch (error) {
            console.error("Error while searching wikipedia", error);
            this.setState({
                searchPending: false,
                errorMsg: `Une erreur s'est produite lors de la recherche.\nMerci de bien vouloir réessayer ultérieurement !`
            })
        }

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingTop: 100
    },
    searchResultsContainer: {
        marginTop: 20,
        alignSelf: 'stretch'
    },
    errorMsg: {
        color: Colors.error
    },
    card: {
        marginVertical: 5,
        backgroundColor: '#f9f9f9'
    }
});
