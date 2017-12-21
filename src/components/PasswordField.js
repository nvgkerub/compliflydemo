import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Image, Platform } from 'react-native';
import PropTypes from 'prop-types';
import * as colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  textfield: {
     height: 40,
     width: '100%',
     color: colors.white,
     paddingLeft: 40,
     ...Platform.select({
       ios: {
         borderBottomColor: colors.borderGray,
         borderBottomWidth: 1,
       }
     })
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 12,
    maxWidth: 20,
    resizeMode: 'contain',
  }
});

class PasswordField extends Component {

  static propTypes = {
    icon: PropTypes.string,
    password: PropTypes.string,
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image source={require('../images/lock.png')} style={styles.icon} />
          <TextInput
            style={styles.textfield}
            value={this.props.username}
            onChangeText={(text) => this.props.handleTxtChange(text)}
            autoCorrent={false}
            autoCapitalize={'none'}
          />
        </View>
      </View>
    );
  }
}

export default PasswordField;
