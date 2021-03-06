import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: colors.teal,
  },
  label: {
    textAlign: 'center',
    color: colors.white,
  },
  inner: {
    justifyContent: 'center',
    height: 45,
  }
});

class ButtonColored extends Component {

  _handleClicked = () => {
    this.props.clicked();
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this._handleClicked}>
        <View style={styles.inner}>
          <Text style={styles.label}>{this.props.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, null)(ButtonColored);
