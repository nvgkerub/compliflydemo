import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as iconStyle from '../constants/iconStyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
    paddingTop: 25,
    backgroundColor: colors.white,
    height: 85,
  },
  left: {
    width: 40,
  },
  navIcon: iconStyle.nav.open,
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle: {
    marginLeft: 20,
  },
  bell: iconStyle.nav.bell,
  mic: iconStyle.nav.audio,
});

class Header extends Component {

  _goToNotifications = () => {
    this.props.goToNotifications();
  }

  _goToAudio = () => {
    this.props.goToAudio();
  }

  _openDrawer = () => {
    this.props.openDrawer();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this._openDrawer}
        >
          <View style={styles.left}>
            <Image style={styles.navIcon} source={require('../images/navIcon.png')} />
          </View>
        </TouchableOpacity>
        <Image style={styles.middle} source={require('../images/logo_small.png')} />
        <View style={styles.right}>
          <TouchableOpacity onPress={this._goToNotifications}>
            <Image style={styles.bell} source={require('../images/bellIcon.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._goToAudio}>
            <Image style={styles.mic} source={require('../images/micIcon.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(null, null)(Header);
