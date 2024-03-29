/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {LayoutAnimation, FlatList, StyleSheet, Text, View} from 'react-native';
import {Title} from "react-native-paper";
import {removeFavoriteAction} from "../redux/favorites";
import {connect} from "react-redux";
import PageCard from "../components/PageCard";

type Props = {};

class FavoritesScreen extends Component<Props> {

  state = {
  };

  render() {
    const {favoritePages} = this.props;

    return (
      <View style={styles.container}>
        <Title>Vos Favoris</Title>
        <View style={styles.searchResultsContainer}>
          {favoritePages && (favoritePages.length === 0 ?
              <Text>Vous n'avez pas de favoris :-( </Text>
              :
              <FlatList data={favoritePages}
                        style={styles.list}
                        renderItem={this.renderPageCard}
                        keyExtractor={(item, index) => "page-" + item.pageid}
              >

              </FlatList>)
          }
        </View>
      </View>
    );
  }
  renderPageCard = ({item}) => {
    return item && <PageCard item={item} onToggleFavorite={() => this.toggleFavorite(item)}/>
  };


  toggleFavorite = (page) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.props.removeFavoriteAction(page);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding:10,
    paddingTop: 50
  },
  searchResultsContainer: {
    marginTop: 20,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  list:{
    alignSelf: 'stretch'
  },
  card: {
    margin: 5,
    backgroundColor: '#f9f9f9',
  }
});


// here we're mapping state to props
const mapStateToProps = state => {
  const {favorites} = state;
  return {
    favoritePages: favorites.pages
  };
};

// here we're mapping actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    removeFavoriteAction: (page) => dispatch(removeFavoriteAction(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);