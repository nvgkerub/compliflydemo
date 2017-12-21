import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
    backgroundColor: colors.white,
    height: 50,
  },
  left: {
    width: 40,
  },
  navIcon: {
    width: 40,
    resizeMode: 'contain',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle: {
    marginLeft: 20,
  },
  bell: {
    maxWidth: 20,
    marginRight: 20,
  },
  mic: {
    maxWidth: 20,
  }
});

class Header extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => { this.props.navigation.navigate('DrawerToggle'); }}
        >
          <View style={styles.left}>
            <Image style={styles.navIcon} source={require('../images/navIcon.png')} />
          </View>
        </TouchableOpacity>
        <Image style={styles.middle} source={require('../images/logo_small.png')} />
        <View style={styles.right}>
          <Image style={styles.bell} source={require('../images/bellIcon.png')} />
          <Image style={styles.mic} source={require('../images/micIcon.png')} />
        </View>
      </View>
    );
  }
}

export default connect(null, null)(Header);
