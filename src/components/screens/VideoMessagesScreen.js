import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class VideoMessagesScreen extends Component {

  render() {
    return (
      <View>
        <Text>Video Messages</Text>
      </View>
    );
  }
}

export default connect(null, null)(VideoMessagesScreen);
