import React, { Component } from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
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
  bell: iconStyle.nav.bell,
  mic: iconStyle.nav.audio,
  logo: iconStyle.nav.logo,
});

class HeaderLeft extends Component {

  _openDrawer = () => {
    this.props.onPress.state.params.openDrawer();
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this._openDrawer}
      >
        <View style={styles.left}>
          <Image style={styles.navIcon} source={require('../images/nav2x.png')} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, null)(HeaderLeft);
