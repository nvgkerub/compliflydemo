import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as iconStyle from '../constants/iconStyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
  bold: {
    color: colors.white,
    fontWeight: 'bold',
  },
  light: {
    color: colors.whiteO,
    fontSize: 12,
  },
  icon: iconStyle.dots,
});

class NoteItem extends Component {

  _clicked = () => {
    // INSIDE OF PARENT PASS THE WHOLE ITEM OBJECT IN NAVIGATION PARAMS
    // SIMILAR TO HRScreen
    // this.props.handleClick();
  }
  // <Text style={styles.light}>{this.props.subTitle}</Text>

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.bold}>{this.props.title}</Text>
          <Text style={styles.light}>{this.props.subtitle}</Text>
        </View>
        <Image style={styles.icon} source={require('../images/dots.png')} />
      </View>
    );
  }
}

export default connect(null, null)(NoteItem);
