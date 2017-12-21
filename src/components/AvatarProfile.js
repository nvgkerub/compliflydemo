import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as strings from '../constants/strings';
import Avatar from './Avatar';

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class AvatarProfile extends Component {
  //TODO: SEND USER INFO OBJECT TO AvatarProfile

  render() {
    return (
      <View style={styles.container}>
        <Avatar user={this.props.user} />
      </View>
    );
  }
}

export default connect(null, null)(AvatarProfile);
