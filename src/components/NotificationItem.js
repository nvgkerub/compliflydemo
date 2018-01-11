import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  content: {
    flex: 1,
  },
  bold: {
    color: colors.white,
    fontWeight: 'bold',
  },
  light: {
    color: colors.whiteO,
    fontSize: 12,
  },
});

class NotificationItem extends Component {

  _clicked = () => {
    // console.log(this.props);
  }
  // <Text style={styles.light}>{this.props.subTitle}</Text>

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.bold}>{this.props.title}</Text>
          <Text style={styles.light}>{this.props.subtitle}</Text>
        </View>
      </View>
    );
  }
}

export default connect(null, null)(NotificationItem);
