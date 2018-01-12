import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as textStyle from '../constants/textStyle';
import * as iconStyle from '../constants/iconStyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  content: {
    flex: 1,
  },
  bold: textStyle.bold,
  light: textStyle.light,
  iconFile: iconStyle.message.file,
  icon: iconStyle.dots,
});


// <Text style={styles.light}>{this.props.subTitle}</Text>

class ListItemIcon extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.iconFile} source={require('../images/fileO2x.png')} />
        <View style={styles.content}>
          <Text style={styles.bold}>{this.props.title}</Text>
          {this.props.subTitle != null
            ?
          <Text style={styles.light}>{this.props.subTitle}</Text>
            :
            null
          }
        </View>
        <TouchableOpacity>
          <Image style={styles.icon} source={require('../images/dots.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(null, null)(ListItemIcon);
