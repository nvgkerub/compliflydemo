import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../Header';
import * as colors from '../../constants/colors';
import * as english from '../../constants/strings';
import * as spanish from '../../constants/spanish';
import * as routeNames from '../../constants/routeNames';
import TopProfileSection from '../TopProfileSection';
import LineSeperator from '../LineSeperator';
import JobSection from '../Dashboard/JobSection';
import LibrarySection from '../Dashboard/LibrarySection';
import HRSection from '../Dashboard/HRSection';
import NotesSection from '../Dashboard/NotesSection';
import MessagesSection from '../Dashboard/MessagesSection';
import { grabUserProfile, grabUserPic, updateLang } from '../../actions/ProfileActions';
import * as userAPI from '../../lib/api/userAPI';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  inner: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  companyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
  companyImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
});

class HomeScreen extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { clientLogo: null, language: null };
  }

  componentWillMount = () => {
    axios.get(userAPI.profile.userClientLogo, {
      params: {
        access_token: this.props.token,
      }
    })
      .then(res => this.setState({ clientLogo: res.data.response.photo }))
      .catch(err => console.log('client logo error', err));
    this.props.grabUserProfile(this.props.token);
    this.props.grabUserPic(this.props.token);
  }

  componentDidMount = () => {
    this.setState({ language: this.props.language });
  }

  _openDrawer = () => {
    this.props.navigation.navigate(routeNames.drawer.open);
  }

  _goToJob = () => {
    this.props.navigation.navigate(routeNames.dash.job);
  }

  _goToProfile = () => {
    this.props.navigation.navigate(routeNames.dash.profile, {
      refresh: this._reGrabLanguage,
    });
  }

  _goToLibrary = () => {
    this.props.navigation.navigate(routeNames.dash.library);
  }

  _goToHR = () => {
    this.props.navigation.navigate(routeNames.dash.compliance);
  }

  _goToNotes = () => {
    this.props.navigation.navigate(routeNames.dash.notes);
  }

  _goToMessages = () => {
    this.props.navigation.navigate(routeNames.dash.messages);
  }

  _goToNotifications = () => {
    this.props.navigation.navigate(routeNames.dash.notifications);
  }

  _goToAudio = () => {
    this.props.navigation.navigate(routeNames.dash.audio);
  }

  _reGrabLanguage = () => {
    this._grabLang();
  }

  async _grabLang() {
    const language = await AsyncStorage.getItem('language');
    this.setState({ language });
  }

  render() {
    var lang = null;
    if (this.state.language === 'spanish') {
      lang = spanish;
    } else {
      lang = english;
    }
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <Header
            goToNotifications={this._goToNotifications}
            goToAudio={this._goToAudio}
            openDrawer={this._openDrawer}
            profile={this.props.profile}
          />
          <ScrollView>
            <TopProfileSection
              nav={this._goToProfile}
              profile={this.props.profile}
              token={this.props.token}
            />
            <LineSeperator />
            <View style={styles.companyContainer}>
              {this.state.clientLogo != null ?
                  <Image
                    style={styles.companyImage}
                    source={{ uri: this.state.clientLogo }}
                  />
                :
                  <Image
                    style={styles.companyImage}
                    source={require('../../images/logowhite.png')}
                  />
              }
            </View>
            <LineSeperator />
            <MessagesSection nav={this._goToMessages} strings={lang} />
            <LineSeperator />
            <JobSection nav={this._goToJob} strings={lang} />
            <LineSeperator />
            <LibrarySection nav={this._goToLibrary} strings={lang} />
            <LineSeperator />
            <HRSection nav={this._goToHR} strings={lang} />
            <LineSeperator />
            <NotesSection nav={this._goToNotes} strings={lang} />
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.accessToken,
    profile: state.profile.userProfile,
    language: state.session.language,
  };
};

export default connect(mapStateToProps, {
  grabUserProfile,
  grabUserPic,
  updateLang
})(HomeScreen);
