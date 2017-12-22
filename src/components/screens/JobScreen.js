import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import JobItem from '../ListItem';
import { grabUserJobs } from '../../actions/ProfileActions';

const filler = [
  { title: 'NortVillageGroup', subTitle: 'Code Breaker', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim', phone: '909-123-3210', address: '123 Fake Address', dob: '01 B.C.', email: 'gmail@gmail.com', skype: 'lolol' },
  { title: 'North', subTitle: 'Code' },
  { title: 'Village', subTitle: 'Breaker' },
  { title: 'Group' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: 'transparent',
  },
});

class JobScreen extends Component {

  componentDidMount = () => {
    this.props.grabUserJobs(this.props.token);
  }

  _handleClick = (job) => {
    //TODO: pass the whole object of job
    this.props.navigation.navigate('ViewInfo', { jobInfo: job });
  }

  _renderItems = () => {
    if (this.props.jobsData != null) {
      return this.props.jobsData.clientlist.map((item, i) => {
        return (
          <TouchableOpacity key={i} onPress={this._handleClick.bind(this, item)}>
            <JobItem title={item.company_name} />
          </TouchableOpacity>
        );
      });
    }
    return (
      <Text>No Jobs</Text>
    );
  }


  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <ScrollView>
            {this._renderItems()}
          </ScrollView>
        </View>
        <StatusBar hidden />
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.session.accessToken,
    jobsData: state.profile.userJobs
  };
};

export default connect(mapStateToProps, {
  grabUserJobs
})(JobScreen);
