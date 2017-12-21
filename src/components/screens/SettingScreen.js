import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import HeaderSub from '../HeaderSub';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

class SettingScreen extends Component {
  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <Text>Settings</Text>
        </View>
        <StatusBar hidden />
      </LinearGradient>
    );
  }
}

export default connect(null, null)(SettingScreen);
