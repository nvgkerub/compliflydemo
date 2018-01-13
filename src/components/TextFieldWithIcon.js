import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Platform
} from 'react-native';
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

class TextFieldWithIcon extends Component {

  static propTypes = {
    icon: PropTypes.string,
  }

  _renderField = () => {
    switch (this.props.icon) {

      case 'username':
        return (
          <View>
            <Image source={require('../images/user.png')} style={styles.icon} />
            <TextInput style={styles.textfield} />
          </View>
        );

      case 'password':
        return (
          <View>
            <Image source={require('../images/lock.png')} style={styles.icon} />
            <TextInput style={styles.textfield} />
          </View>
        )

      default:
        return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderField()}
      </View>
    );
  }
}

export default TextFieldWithIcon;
