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
                    onChangeText={this.onChangeText}
                    onIconPress={this.onSearch}
                    value={searchQuery}
                />

                <View style={styles.searchResultsContainer}>
                    {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
                    {searchResultPages && (searchResultPages.length === 0 ?
                        <Text>Aucun résultat trouvé :-( </Text>
                        :
                        <FlatList data={searchResultPages} renderItem={this.renderPageCard}
                                  onEndReached={this.onLoadMore}>

                        </FlatList>)
                    }
                    {searchPending && <ActivityIndicator/>}
                </View>

            </View>
        );
    }

    renderPageCard = ({item, index}) => {
        return <Card key={'card_' + index} style={styles.card}>
            <Card.Title key={'cardTitle_' + index} title={item.title} subtitle={item.description}
                        left={(props) =>
                            <Image {...props} key={'cardThumb_' + index} source={{uri: item.thumbnail && item.thumbnail.source}} style={{height: 45, width: 45, backgroundColor:'#ddd'}}/>}
            />
        </Card>
    };

    onChangeText = query => {
        if (!query || query.length === 0) {
            this.setState({searchResultPages: false, errorMsg: false});
        }
        this.setState({searchQuery: query});
    };

    onSearch = async () => {
        const {searchQuery} = this.state;
        if (!searchQuery || searchQuery.trim().length === 0) {
            this.setState({searchResultPages: false, errorMsg: false});
            return;
        }

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

    };

    onLoadMore = async () => {
        let {searchResultPages, searchQuery} = this.state;
        this.setState({errorMsg: false});

        try {
            const moreResultPages = await wikiService.search(searchQuery.trim(), searchResultPages.length);
            searchResultPages = searchResultPages.concat(moreResultPages);
            this.setState({searchResultPages})
        } catch (error) {
            console.error("Error while searching wikipedia", error);
            this.setState({
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
        margin: 5,
        backgroundColor: '#f9f9f9'
    }
});
