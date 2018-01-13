import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as routeNames from '../constants/routeNames';
import * as iconStyle from '../constants/iconStyle';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.blueDark,
    paddingTop: 15,
  },
  container: {
    flex: 1,
  },
  closeBtn: {
    paddingLeft: 5,
    marginTop: 20,
  },
  icon: iconStyle.nav.close,
});


class CustomDrawer extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => { this.props.navigation.navigate(routeNames.drawer.close); }}
        >
          <Image style={styles.icon} source={require('../images/xicon2x.png')} />
        </TouchableOpacity>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(null, null)(CustomDrawer);
