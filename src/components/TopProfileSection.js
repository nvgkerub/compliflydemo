import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as strings from '../constants/strings';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 5,
    // flexDirection: 'row',
  },
  inner: {
    flexDirection: 'row',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.white,
    marginRight: 15,
  },
  pill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blueGray,
    flex: 1,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 10,
  },
  textBold: {
    fontWeight: 'bold',
    color: colors.white,
  },
  textLight: {
    color: colors.white,
  },
});

class TopProfileSection extends Component {

  componentDidMount = () => {
    console.log(this.props);
  }

  _clicked = () => {
    this.props.nav();
  }

  _renderContent = () => {
    if (this.props.profile != null) {
      return (
        <View style={styles.inner}>
          <Image style={styles.profilePic} source={require('../images/random.jpg')} />
          <View style={styles.pill}>
            <View>
              <Text style={styles.textBold}>{this.props.profile != null ? this.props.profile.first_name : 'first name' }</Text>
              <Text style={styles.textLight}>{this.props.profile != null ? this.props.profile.last_name : 'last name' }</Text>
            </View>
            <TouchableOpacity onPress={this._clicked}>
              <View>
                <Image source={require('../images/setting.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View>
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderContent()}
      </View>
    );
  }
}

export default connect(null, null)(TopProfileSection);
