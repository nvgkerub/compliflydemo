import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, StatusBar, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ListItem from '../ListItem';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import JobItemInfo from '../JobItemInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  descriptionMain: {
    backgroundColor: colors.blue,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
  },
  descriptionBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  logo: {
    resizeMode: 'contain',
    maxHeight: 120,
  },
  jobTitle: {
    flexDirection: 'row',
  },
  jobLabelLeft: {
    fontWeight: 'bold',
    color: colors.white,
  },
  jobLabelRight: {
    color: colors.white,
  },
  description: {
    marginTop: 15,
  },
  descriptionText: {
    color: colors.white
  },
});

class JobInfoScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.jobInfo.title}`,
  });

  //TODO: Add job specific api for data
  //TODO: change job data from state.params to api data

  render() {
    const { subTitle, description, phone, address, dob, email, skype } = this.props.navigation.state.params.jobInfo;
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <ScrollView>
            <View style={styles.descriptionMain}>
              <View style={styles.descriptionBox}>
                <Image
                  style={styles.logo}
                  source={require('../../images/logoblack.png')}
                />
              </View>
                {subTitle != null ?
                  <View style={styles.jobTitle}>
                    <Text style={styles.jobLabelLeft}>Job Position: </Text>
                    <Text style={styles.jobLabelRight}>{ subTitle }</Text>
                  </View>
                : null
                }
              <View style={styles.description}>
                {description != null ? <Text style={styles.descriptionText}>{ description }</Text> : null}
              </View>
            </View>
            <View>
              {phone != null ? <JobItemInfo label={strings.jobInfoLabel.phone} content={phone} /> : null}
              {address != null ? <JobItemInfo label={strings.jobInfoLabel.address} content={address} /> : null}
              {dob != null ? <JobItemInfo label={strings.jobInfoLabel.dob} content={dob} /> : null}
              {email != null ? <JobItemInfo label={strings.jobInfoLabel.email} content={email} /> : null}
              {skype != null ? <JobItemInfo label={strings.jobInfoLabel.skype} content={skype} /> : null}
            </View>
          </ScrollView>
        </View>
        <StatusBar hidden />
      </LinearGradient>
    );
  }
}

export default connect(null, null)(JobInfoScreen);
