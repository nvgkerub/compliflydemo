import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
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
    alignItems: 'flex-end',
  },
  bold: textStyle.bold,
  light: textStyle.light,
  icon: {
    width: 50,
    resizeMode: 'contain',
  }
});

class JobItemInfo extends Component {

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

export default connect(null, null)(JobItemInfo);
