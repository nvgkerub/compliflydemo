import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as textStyle from '../../constants/textStyle';
import * as iconStyle from '../../constants/iconStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: iconStyle.dash.compliance,
  bold: textStyle.bold,
  light: textStyle.light,
  inner: {
    flex: 1,
  }
});

class HRSection extends Component {

  _clicked = () => {
    this.props.nav();
  }

  render() {
    return (
      <TouchableOpacity onPress={this._clicked}>
        <View style={styles.container}>
          <Image style={styles.icon} source={require('../../images/compliance2x.png')} />
          <View style={styles.inner}>
            <Text style={styles.bold}>{this.props.strings.dashboard.HRTitle}</Text>
            <Text style={styles.light}>{this.props.strings.dashboard.HRSubTitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, null)(HRSection);
