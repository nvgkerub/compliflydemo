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
  bold: textStyle.bold,
  light: textStyle.light,
  icon: {
    width: 50,
    resizeMode: 'contain',
  }
});

class ComplianceItem extends Component {

  _clicked = () => {
    this.props.handleClick();
  }
  // <Text style={styles.light}>{this.props.subTitle}</Text>

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.inner} onPress={this._clicked}>
          <View style={styles.content}>
            <Text style={styles.bold}>{this.props.title}</Text>
            <Text style={styles.light}>Viewed: {this.props.viewed}</Text>
          </View>
          {
            this.props.viewed === 'No'
              ?
              <Image style={styles.icon} source={require('../images/dots.png')} />
              :
              null
          }
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, null)(ComplianceItem);
