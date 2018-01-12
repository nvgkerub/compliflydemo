import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as textStyle from '../constants/textStyle';
import * as iconStyle from '../constants/iconStyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  bold: textStyle.bold,
  light: textStyle.light,
  iconFile: {
    height: 25,
    resizeMode: 'contain',
    marginRight: 10,
  },
  icon: iconStyle.library,
});

class VideoItem extends Component {

  _clicked = () => {
    this.props.handleClick();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.inner} onPress={this._clicked}>
          <Image style={styles.iconFile} source={require('../images/videowhite2x.png')} />
          <View style={styles.content}>
            <Text style={styles.bold}>{this.props.title}</Text>
            <Text style={styles.light}>{this.props.subTitle}</Text>
          </View>
          <Image style={styles.icon} source={require('../images/dots.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, null)(VideoItem);
