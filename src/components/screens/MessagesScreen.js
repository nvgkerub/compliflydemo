import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import DirectItem from '../DirectItem';
import MessagesInnerSection from '../MessagesInnerSection';
import LineSeperator from '../LineSeperator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: 'transparent',
    marginTop: 30,
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
          <ScrollView>
            <MessagesInnerSection
              nav={this._goToManager}
              label={strings.messagesScreen.managerTitle}
              sublabel={strings.messagesScreen.managerSubtitle}
              type={strings.directLabel.manager}
            />
            <LineSeperator />
            <MessagesInnerSection
              nav={this._goToHr}
              label={strings.messagesScreen.hrTitle}
              sublabel={strings.messagesScreen.hrSubtitle}
              type={strings.directLabel.hrLabel}
            />
            <LineSeperator />
            <MessagesInnerSection
              nav={this._goToSafety}
              label={strings.messagesScreen.safetyTitle}
              sublabel={strings.messagesScreen.safetySubtitle}
              type={strings.directLabel.safety}
            />
            <LineSeperator />
            <MessagesInnerSection
              nav={this._goToExecutive}
              label={strings.messagesScreen.executiveTitle}
              sublabel={strings.messagesScreen.executiveSubtitle}
              type={strings.directLabel.executive}
            />
            <LineSeperator />
            <MessagesInnerSection
              nav={this._goToPicture}
              label={strings.messagesScreen.pictureTitle}
              sublabel={strings.messagesScreen.pictureSubtitle}
              type={strings.directLabel.picture}
            />
            <LineSeperator />
            <MessagesInnerSection
              nav={this._goToVideo}
              label={strings.messagesScreen.videoTitle}
              sublabel={strings.messagesScreen.videoSubtitle}
              type={strings.directLabel.video}
            />
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

export default connect(null, null)(MessagesScreen);
