import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import AvatarProfile from '../AvatarProfile';
import ProfileItems from '../ProfileItems';

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
          <AvatarProfile user={this.props.profile} />
          <ProfileItems user={this.props.profile} />
        </View>
        <StatusBar hidden />
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.accessToken,
    profile: state.profile.userProfile,
  };
};

export default connect(mapStateToProps, null)(ProfileScreen);
