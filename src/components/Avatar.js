import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as textStyle from '../constants/textStyle';

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
    fontWeight: textStyle.fontWeight.bold,
    marginTop: 5,
    fontSize: textStyle.fontSize.light,
    textAlign: 'center',
  },
  camera: {
    width: 20,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    left: '40%',
  }
});

class Avatar extends Component {

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
            <View>
              <Image
                style={styles.avatar}
                source={{ uri: this.props.profileUrl }}
              />
              <Image
                style={styles.camera}
                source={require('../images/pictureMssg.png')}
              />
            </View>
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
