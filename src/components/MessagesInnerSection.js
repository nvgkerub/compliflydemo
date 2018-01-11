import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as strings from '../constants/strings';
import * as textStyle from '../constants/textStyle';

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
    width: 25,
    marginRight: 35,
    marginLeft: 15,
    resizeMode: 'contain',
  },
  bold: textStyle.bold,
  light: textStyle.light,
  inner: {
    flex: 1,
  }
});

class MessegesInnerSection extends Component {

  _clicked = () => {
    this.props.nav();
  }

  _renderIcon() {
    switch (this.props.type) {
      case strings.directLabel.manager:
        return <Image style={styles.icon} source={require('../images/manager.png')} />;

      case strings.directLabel.hrLabel:
        return <Image style={styles.icon} source={require('../images/HR.png')} />;

      case strings.directLabel.safety:
        return <Image style={styles.icon} source={require('../images/safety.png')} />;

      case strings.directLabel.executive:
        return <Image style={styles.icon} source={require('../images/executive.png')} />;

      case strings.directLabel.picture:
        return <Image style={styles.icon} source={require('../images/pictureMssg.png')} />;

      case strings.directLabel.video:
        return <Image style={styles.icon} source={require('../images/videoMssg.png')} />;

      default:
        return <Image style={styles.icon} source={require('../images/messages.png')} />;
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this._clicked}>
        <View style={styles.container}>
          {this._renderIcon()}
          <View style={styles.inner}>
            <Text style={styles.bold}>{this.props.label}</Text>
            <Text style={styles.light}>{this.props.sublabel}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, null)(MessegesInnerSection);
