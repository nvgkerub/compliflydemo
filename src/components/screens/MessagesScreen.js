import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import * as textStyle from '../../constants/textStyle';
import MessagesInnerSection from '../MessagesInnerSection';
import LineSeperator from '../LineSeperator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: 'transparent',
    marginTop: 30,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
  },
  customTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
  },
  tabTxt: {
    fontSize: textStyle.fontSize.light,
    fontWeight: textStyle.fontWeight.bold,
    color: colors.white,
  },
  tabTxtActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.teal,
  }
});

class MessagesScreen extends Component {

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
    this.props.navigation.navigate('Picture', {
      messageInfo: {
        subject: 'Send a Picture',
        receiver: 'Picture Rep',
        type: 'picture'
      }
    });
  }

  _goToVideo = () => {
    this.props.navigation.navigate('Video', {
      messageInfo: {
        subject: 'Send a Video',
        receiver: 'Video Rep',
        type: 'video'
      }
    });
  }

  _goToInbox = () => {
    this.props.navigation.navigate('Inbox');
  }

  _goToSent = () => {
    this.props.navigation.navigate('Sent');
  }

  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.customTabs}>
            <View style={styles.tabTxtActive}>
              <Text style={styles.tabTxt}>Direct</Text>
            </View>
            <TouchableOpacity onPress={this._goToInbox.bind(this)}>
              <Text style={styles.tabTxt}>Inbox</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToSent.bind(this)}>
              <Text style={styles.tabTxt}>Sent</Text>
            </TouchableOpacity>
          </View>
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
