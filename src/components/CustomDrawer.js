import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as routeNames from '../constants/routeNames';
import * as iconStyle from '../constants/iconStyle';
import * as textStyle from '../constants/textStyle';

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
    marginBottom: 40,
  },
  icon: iconStyle.nav.close,
  link: textStyle.bold,
  linkTxt: {
    marginLeft: 15,
    marginBottom: 15,
  }
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate(routeNames.dash.home)}>
          <Text style={[styles.link, styles.linkTxt]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(routeNames.dash.profile)}>
          <Text style={[styles.link, styles.linkTxt]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(routeNames.dash.home)}>
          <Text style={[styles.link, styles.linkTxt]}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(routeNames.dash.home)}>
          <Text style={[styles.link, styles.linkTxt]}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, null)(CustomDrawer);
// <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
//   <DrawerItems {...this.props} />
// </SafeAreaView>
