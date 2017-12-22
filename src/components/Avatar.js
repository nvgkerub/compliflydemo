import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as strings from '../constants/strings';

const styles = StyleSheet.create({
  avatar: {
    resizeMode: 'contain',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: colors.white,
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 15,
  }
});

class Avatar extends Component {

  _handleClick = () => {
    console.log('Avatar Clicked');
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._handleClick}>
          <Image
            style={styles.avatar}
            source={require('../images/random.jpg')}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{this.props.user.first_name} {this.props.user.middle_name} {this.props.user.last_name} </Text>
      </View>
    );
  }
}

export default connect(null, null)(Avatar);
