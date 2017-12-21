import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import HeaderSub from '../HeaderSub';
import * as colors from '../../constants/colors';
import AvatarProfile from '../AvatarProfile';
import ProfileItems from '../ProfileItems';

const filler = {
  name: 'Putana Jakit',
  phone: '909-555-5555',
  address: '123 fake st',
  dob: '01 B.C.',
  email: 'gmail@gmail.com',
  skype: 'complifly',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: 'transparent',
  }
});

class ProfileScreen extends Component {
  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <AvatarProfile user={filler} />
          <ProfileItems user={filler} />
        </View>
        <StatusBar hidden />
      </LinearGradient>
    );
  }
}

export default connect(null, null)(ProfileScreen);
