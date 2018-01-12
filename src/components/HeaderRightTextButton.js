import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as strings from '../constants/strings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: colors.blueDark,
    marginRight: 10,
  }
});

class HeaderRightTextButton extends Component {

  _handleClicked = () => {
    //TODO: add redux to save note then navigate back to notes
    this.props.navigation.state.params.save();
  }

  render() {
    return (
      <TouchableOpacity onPress={this._handleClicked.bind(this)}>
        <View style={styles.container}>
          <Text style={styles.label}>{this.props.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, null)(HeaderRightTextButton);
