import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import * as colors from '../constants/colors';

const styles = StyleSheet.create({
  line: {
    marginTop: 10,
    marginBottom: 10,
    height: 1,
    width: '100%',
    backgroundColor: colors.borderGray,
  }
});

class LineSeperator extends PureComponent {
  render() {
    return (
      <View style={styles.line} />
    );
  }
}

export default LineSeperator;
