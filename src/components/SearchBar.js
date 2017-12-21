import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as strings from '../constants/strings';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBlue,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 7,
    paddingBottom: 7,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.darkBlueTwo,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  input: {
    color: colors.white,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  }
});

class SearchBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.search}>
            <Image style={styles.icon} source={require('../images/search.png')} />
            <TextInput
              style={styles.input}
              placeholder="Search" onChangeText={(text) => this.props.handleSearch(text)}
              autoCapitalize="none"
            />
          </View>
          <Image style={styles.icon} source={require('../images/filter.png')} />
        </View>
      </View>
    );
  }
}

export default connect(null, null)(SearchBar);
