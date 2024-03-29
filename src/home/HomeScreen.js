/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, LayoutAnimation} from 'react-native';
import {ActivityIndicator, Searchbar, Card, IconButton} from "react-native-paper";
import {Colors} from "../Theme";
import {wikiService} from "../services/WikiService";
import {connect} from 'react-redux';
import {addFavoriteAction, removeFavoriteAction} from "../redux/favorites";
import {searchAction, searchClearAction} from "../redux/wikipedia";
import * as Animatable from 'react-native-animatable';
import FavoriteButton from "../components/FavoriteButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import PageCard from "../components/PageCard";

type Props = {};

class HomeScreen extends Component<Props> {

    state = {
        searchQuery: 'nelson mandela',
    };

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (this.props.searchResult != nextProps.searchResult) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
        if (nextProps.searchResult && nextProps.searchResult.length === 0) {
            this.shakeSearchBar();
        }
    }

    render() {
        const {searchQuery} = this.state;
        const {favoritePageIds, searchPending, searchResult, error} = this.props;
        const resultWithFavorites = searchResult && searchResult.map(page => {
            page.isFavorite = (favoritePageIds.indexOf(page.pageid) >= 0);
            return page;
        });

        return (
            <View style={styles.container}>

                <Animatable.View ref={me => this.searchBar = me} style={{alignSelf: 'stretch'}}>
                    <Searchbar
                        placeholder="Rechercher"
                        onChangeText={this.onChangeText}
                        onIconPress={this.onSearch}
                        value={searchQuery}
                    />
                </Animatable.View>

                <View style={styles.searchResultsContainer}>
                    {error && <Text style={styles.errorMsg}>{error}</Text>}
                    {searchResult && (searchResult.length === 0 ?
                        <Text>Aucun résultat trouvé :-( </Text>
                        :
                        <FlatList data={resultWithFavorites}
                                  style={styles.list}
                                  renderItem={this.renderPageCard}
                                  onEndReached={this.onLoadMore}
                                  keyExtractor={(item, index) => index.toString()}
                        >

                        </FlatList>)
                    }
                </View>
                {searchPending &&
                <View style={{
                    position: 'absolute',
                    bottom: 10,
                    backgroundColor: Colors.white,
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator/>
                </View>}

            </View>
        );
    }

    renderPageCard = ({item}) => {
        return item && <PageCard item={item} onToggleFavorite={() => this.toggleFavorite(item)}/>
    };

    onChangeText = query => {
        if (!query || query.length === 0) {
            this.props.searchClearAction();
        }
        this.setState({searchQuery: query});
    };

    onSearch = () => {
        const {searchQuery} = this.state;
        if (!searchQuery || searchQuery.trim().length === 0) {
            this.shakeSearchBar();
            this.props.searchClearAction();
            return;
        }

        this.props.searchAction(searchQuery.trim());

    };

    onLoadMore = async () => {
        let {searchQuery} = this.state;
        this.props.searchAction(searchQuery.trim(), this.props.searchResult.length);
    };

    // ------------------------------------------------------------------------------------------------ private

    toggleFavorite = (page) => {
        if (page.isFavorite) {
            this.props.removeFavoriteAction(page);
        } else {
            this.props.addFavoriteAction(page);
        }
    }

    shakeSearchBar() {
        this.searchBar.shake(1000);
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
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    errorMsg: {
        color: Colors.error
    },
    list: {
        alignSelf: 'stretch'
    },

});


// here we're mapping state to props
const mapStateToProps = state => {
    const {favorites, wikipedia} = state;
    return {
        favoritePageIds: favorites.pages.map(page => page.pageid),
        searchPending: wikipedia.searchPending,
        searchResult: wikipedia.searchResult,
        error: wikipedia.error && `Une erreur s'est produite lors de la recherche.\nMerci de bien vouloir réessayer ultérieurement !`,
    };
};

// here we're mapping actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        addFavoriteAction: (page) => dispatch(addFavoriteAction(page)),
        removeFavoriteAction: (page) => dispatch(removeFavoriteAction(page)),
        searchAction: (keyword, offset = 0) => dispatch(searchAction(keyword, offset)),
        searchClearAction: () => dispatch(searchClearAction())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);