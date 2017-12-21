import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import HeaderSub from '../HeaderSub';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import DirectItem from '../DirectItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: 'transparent',
    marginTop: 30,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
  }
});

class MessagesScreen extends Component {

  componentDidMount = () => {
    console.log(this.props);
  }

  _goToManager = () => {
    this.props.navigation.navigate('Manager');
  }

  _goToHr = () => {
    this.props.navigation.navigate('Hr');
  }

  _goToSafety = () => {
    this.props.navigation.navigate('Safety');
  }

  _goToExecutive = () => {
    this.props.navigation.navigate('Executive');
  }

  _goToPicture = () => {
    this.props.navigation.navigate('Picture', { messageInfo: { subject: 'Send a Picture', receiver: 'Picture Rep' } });
  }

  _goToVideo = () => {
    this.props.navigation.navigate('Video', { messageInfo: { subject: 'Send a Video', receiver: 'Video Rep' } });
  }

  render() {
    return (
      <LinearGradient colors={[colors.blue, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.row}>
            <DirectItem label={strings.directLabel.manager} nav={this._goToManager} icon='manager' />
            <DirectItem label={strings.directLabel.hrLabel} nav={this._goToHr} icon='hr' />
          </View>
          <View style={styles.row}>
            <DirectItem label={strings.directLabel.safety} nav={this._goToSafety} icon='safety' />
            <DirectItem label={strings.directLabel.executive} nav={this._goToExecutive} icon='executive' />
          </View>
          <View style={styles.row}>
            <DirectItem label={strings.directLabel.picture} nav={this._goToPicture} icon='picture' />
            <DirectItem label={strings.directLabel.video} nav={this._goToVideo} icon='video' />
          </View>
        </View>
        <StatusBar hidden />
      </LinearGradient>
    );
  }
}

export default connect(null, null)(MessagesScreen);
