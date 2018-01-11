import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as strings from '../constants/strings';

const styles = StyleSheet.create({
  avatar: {
    resizeMode: 'cover',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.blueGray,
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 15,
  }
});

class Avatar extends Component {

  componentDidMount = () => {
    console.log(this.props);
  }

  _handleClick = () => {
    this.props.uploadPic();
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._handleClick}>
          {
            this.props.profileUrl === null ?
            <Image
              style={styles.avatar}
            />
          :
            <Image
              style={styles.avatar}
              source={{ uri: this.props.profileUrl }}
            />
          }
        </TouchableOpacity>
        <Text style={styles.text}>{this.props.user.first_name} {this.props.user.middle_name} {this.props.user.last_name} </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    profileUrl: state.profile.userProfilePic
  };
};

export default connect(mapStateToProps, null)(Avatar);
