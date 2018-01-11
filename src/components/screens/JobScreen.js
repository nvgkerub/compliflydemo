import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import JobItem from '../ListItem';
import { grabUserJobs } from '../../actions/ProfileActions';

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
    console.log('asdf');
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
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <ScrollView>
            {this._renderItems()}
          </ScrollView>
        </View>
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
