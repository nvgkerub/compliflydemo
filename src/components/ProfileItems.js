import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as strings from '../constants/strings';
import ProfileItemEdit from './ProfileItemEdit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class ProfileItems extends Component {
  render() {
    return (
      <View>
        <ProfileItemEdit label="Phone" content={this.props.user.phone} />
        <ProfileItemEdit label="Address" content={this.props.user.address} />
        <ProfileItemEdit label="DOB" content={this.props.user.dob} />
        <ProfileItemEdit label="Email" content={this.props.user.email} />
        <ProfileItemEdit label="Skype" content={this.props.user.skype} />
      </View>
    );
  }
}

export default connect(null, null)(ProfileItems);
