import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 15,
    backgroundColor: colors.white,
    height: 50,
  },
  left: {
    width: 40,
    alignSelf: 'flex-start',
  },
  icon: {
    width: 40,
    resizeMode: 'contain',
  },
  middle: {
    flex: 1,
  },
  title: {
    marginRight: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.blue,
  },
});

class HeaderSub extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => { this.props.goBack(); }}
        >
          <View style={styles.left}>
            <Image style={styles.icon} source={require('../images/backarrow.png')} />
          </View>
        </TouchableOpacity>
        <View style={styles.middle}>
          <Text style={styles.title}>{this.props.screenTitle}</Text>
        </View>
      </View>
    );
  }
}

export default connect(null, null)(HeaderSub);
