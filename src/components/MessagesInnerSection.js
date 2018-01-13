import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as strings from '../constants/strings';
import * as textStyle from '../constants/textStyle';
import * as iconStyle from '../constants/iconStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: iconStyle.message.direct,
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
        return <Image style={styles.icon} source={require('../images/directManager2x.png')} />;

      case strings.directLabel.hrLabel:
        return <Image style={styles.icon} source={require('../images/directHr2x.png')} />;

      case strings.directLabel.safety:
        return <Image style={styles.icon} source={require('../images/directSafety2x.png')} />;

      case strings.directLabel.executive:
        return <Image style={styles.icon} source={require('../images/directExecutive2x.png')} />;

      case strings.directLabel.picture:
        return <Image style={styles.icon} source={require('../images/directPicture2x.png')} />;

      case strings.directLabel.video:
        return <Image style={styles.icon} source={require('../images/directVideo2x.png')} />;

      default:
        return <Image style={styles.icon} source={require('../images/directManager2x.png')} />;
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
