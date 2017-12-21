import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: {
    width: 40,
    marginRight: 35,
    marginLeft: 15,
    resizeMode: 'contain',
  },
  bold: {
    color: colors.white,
    fontWeight: 'bold',
  },
  light: {
    color: colors.whiteO,
    fontSize: 12,
  },
  inner: {
    flex: 1,
  }
});

class NotesSection extends Component {

  _clicked = () => {
    this.props.nav();
  }

  render() {
    return (
      <TouchableOpacity onPress={this._clicked}>
        <View style={styles.container}>
          <Image style={styles.icon} source={require('../../images/notes.png')} />
          <View style={styles.inner}>
            <Text style={styles.bold}>{strings.dashboard.NotesTitle}</Text>
            <Text style={styles.light}>{strings.dashboard.NotesSubTitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, null)(NotesSection);
