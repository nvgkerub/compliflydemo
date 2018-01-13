import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  content: {
    flex: 1,
    alignItems: 'flex-end',
  },
  bold: {
    color: colors.white,
    fontWeight: 'bold',
  },
  light: {
    color: colors.whiteO,
  },
  icon: {
    width: 50,
    resizeMode: 'contain',
  }
});

class ProfileItemEdit extends Component {

  _clicked = () => {
    // console.log(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.bold}>{this.props.label}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.light}>{this.props.content}</Text>
        </View>
      </View>
    );
  }
}

export default connect(null, null)(ProfileItemEdit);
