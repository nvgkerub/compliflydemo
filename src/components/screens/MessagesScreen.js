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
import * as english from '../../constants/strings';
import * as spanish from '../../constants/spanish';
import * as textStyle from '../../constants/textStyle';
import * as routeNames from '../../constants/routeNames';
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
    this.props.navigation.navigate(routeNames.direct.manager);
  }

  _goToHr = () => {
    this.props.navigation.navigate(routeNames.direct.compliance);
  }

  _goToSafety = () => {
    this.props.navigation.navigate(routeNames.direct.safety);
  }

  _goToExecutive = () => {
    this.props.navigation.navigate(routeNames.direct.executive);
  }

  _goToPicture = () => {
    this.props.navigation.navigate(routeNames.direct.picture, {
      messageInfo: {
        subject: 'Send a Picture',
        receiver: 'Picture Rep',
        type: 'picture'
      }
    });
  }

  _goToVideo = () => {
    this.props.navigation.navigate(routeNames.direct.video, {
      messageInfo: {
        subject: 'Send a Video',
        receiver: 'Video Rep',
        type: 'video'
      }
    });
  }

  _goToInbox = () => {
    this.props.navigation.navigate(routeNames.messages.inbox);
  }

  _goToSent = () => {
    this.props.navigation.navigate(routeNames.messages.sent);
  }

  render() {
    var strings = null;
    if (this.props.language === 'spanish') {
      strings = spanish;
    } else {
      strings = english;
    }
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.customTabs}>
            <View style={styles.tabTxtActive}>
              <Text style={styles.tabTxt}>{strings.messagesScreen.directTab}</Text>
            </View>
            <TouchableOpacity onPress={this._goToInbox.bind(this)}>
              <Text style={styles.tabTxt}>{strings.messagesScreen.inboxTab}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToSent.bind(this)}>
              <Text style={styles.tabTxt}>{strings.messagesScreen.sentTab}</Text>
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

const mapStateToProps = state => {
  return {
    language: state.session.language,
  };
};

export default connect(mapStateToProps, null)(MessagesScreen);
