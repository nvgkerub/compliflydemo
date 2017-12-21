import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as strings from '../constants/strings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blueGray,
    padding: 15,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  icon: {
    maxHeight: 50,
    resizeMode: 'contain',
  },
  label: {
    color: colors.white,
    fontWeight: 'bold',
    marginTop: 10,
  }
});

class DirectItem extends Component {

  componentDidMount = () => {
    console.log(this.props);
  }

  _handleClick = () => {
    this.props.nav();
  }

  _renderIcon = () => {
    switch (this.props.icon) {

      case 'manager':
        return (<Image style={styles.icon} source={require('../images/manager.png')} />);
      case 'hr':
        return (<Image style={styles.icon} source={require('../images/HR.png')} />);
      case 'safety':
        return (<Image style={styles.icon} source={require('../images/safety.png')} />);
      case 'executive':
        return (<Image style={styles.icon} source={require('../images/executive.png')} />);
      case 'picture':
        return (<Image style={styles.icon} source={require('../images/pictureMssg.png')} />);
      case 'video':
        return (<Image style={styles.icon} source={require('../images/videoMssg.png')} />);

      default:
        return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._handleClick}>
            <View style={styles.inner}>
              {this._renderIcon()}
              <Text style={styles.label}>{this.props.label}</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, null)(DirectItem);
