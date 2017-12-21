import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as strings from '../constants/strings';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: 15,
  },
  container: {
    flex: 1,
  },
  closeBtn: {
    paddingLeft: 5,
  },
  logoutWrapper: {
    width: '100%',
    height: 80,
    alignSelf: 'flex-end',
    backgroundColor: colors.teal,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    marginRight: 20,
  },
  logoutTxt: {
    color: colors.white,
  }
});


class CustomDrawer extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => { this.props.navigation.navigate('DrawerClose'); }}
        >
          <Image source={require('../images/close.png')} />
        </TouchableOpacity>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...this.props} />
        </SafeAreaView>
        <TouchableOpacity
        onPress={() => { this.props.navigation.navigate('DrawerClose'); }}
        >
          <View style={styles.logoutWrapper}>
            <Image style={styles.logoutIcon} source={require('../images/logout.png')} />
            <Text style={styles.logoutTxt}>
              {strings.logOut}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, null)(CustomDrawer);
