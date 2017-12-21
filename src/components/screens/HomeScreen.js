import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../Header';
import * as colors from '../../constants/colors';
import TopProfileSection from '../TopProfileSection';
import LineSeperator from '../LineSeperator';
import JobSection from '../Dashboard/JobSection';
import ProfileSection from '../Dashboard/ProfileSection';
import LibrarySection from '../Dashboard/LibrarySection';
import HRSection from '../Dashboard/HRSection';
import NotesSection from '../Dashboard/NotesSection';
import MessagesSection from '../Dashboard/MessagesSection';
import grabUserProfile from '../../actions/ProfileActions';

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
    height: 100,
    resizeMode: 'contain',
  },
});

class HomeScreen extends Component {

  static navigationOptions = {
    header: null,
  };

  componentWillMount = () => {

  }
  componentDidMount = () => {
    console.log(this.props);
  }

  _goToSetting = () => {
    this.props.navigation.navigate('Setting');
  }

  _goToJob = () => {
    this.props.navigation.navigate('Job');
  }

  _goToProfile = () => {
    this.props.navigation.navigate('Profile');
  }

  _goToLibrary = () => {
    this.props.navigation.navigate('Library');
  }

  _goToHR = () => {
    this.props.navigation.navigate('HRScreen');
  }

  _goToNotes = () => {
    this.props.navigation.navigate('Notes');
  }

  _goToMessages = () => {
    this.props.navigation.navigate('Messages');
  }

  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <Header navigation={this.props.navigation} />
          <ScrollView>
            <TopProfileSection nav={this._goToSetting} />
            <LineSeperator />
            <View style={styles.companyContainer}>
              <Image style={styles.companyImage} source={require('../../images/logowhite.png')} />
            </View>
            <LineSeperator />
            <JobSection nav={this._goToJob} />
            <LineSeperator />
            <ProfileSection nav={this._goToProfile} />
            <LineSeperator />
            <LibrarySection nav={this._goToLibrary} />
            <LineSeperator />
            <HRSection nav={this._goToHR} />
            <LineSeperator />
            <NotesSection nav={this._goToNotes} />
            <LineSeperator />
            <MessagesSection nav={this._goToMessages} />
          </ScrollView>
        </View>
        <StatusBar hidden />
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.accessToken
  };
};

export default connect(mapStateToProps, {
  grabUserProfile
})(HomeScreen);
