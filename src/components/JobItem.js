import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as textStyle from '../constants/textStyle';
import * as iconStyle from '../constants/iconStyle';

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
  icon: iconStyle.dots,
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
        <Image style={styles.icon} source={require('../images/dots2x.png')} />
      </View>
    );
  }
}

export default connect(null, null)(JobItem);
