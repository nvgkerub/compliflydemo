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
        <ProfileItemEdit label="Telephone" content={this.props.user.telephone} />
        <ProfileItemEdit label="S.S.N." content={this.props.user.ssn} />
        <ProfileItemEdit label="DOB" content={this.props.user.birth_date} />
        <ProfileItemEdit label="Gender" content={this.props.user.gender} />
        <ProfileItemEdit label="Ethnicity" content={this.props.user.ethnicity} />
        <ProfileItemEdit label="Marital Status" content={this.props.user.marital_status} />
        <ProfileItemEdit label="State" content={this.props.user.state} />
        <ProfileItemEdit label="City" content={this.props.user.city} />
        <ProfileItemEdit label="Zip" content={this.props.user.zip} />
      </View>
    );
  }
}

export default connect(null, null)(ProfileItems);
