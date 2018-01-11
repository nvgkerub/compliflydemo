import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as textStyle from '../constants/textStyle';

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
  },
  bold: textStyle.bold,
  light: textStyle.light,
  icon: {
    width: 20,
    resizeMode: 'contain',
  }
});

class JobItem extends Component {

  _clicked = () => {
    // console.log(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.bold}>{this.props.title}</Text>
          <Text style={styles.light}>Sub title</Text>
        </View>
        <TouchableOpacity onPress={this._clicked}>
          <Image style={styles.icon} source={require('../images/setting.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, null)(JobItem);
