import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  Image,
  Text,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import * as userAPI from '../../lib/api/userAPI';
import * as textStyle from '../../constants/textStyle';
import JobItemInfo from '../JobItemInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionMain: {
    backgroundColor: colors.blueFlat,
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
    alignItems: 'center',
  },
  jobLabelLeft: textStyle.bold,
  jobLabelRight: textStyle.light,
  description: {
    marginTop: 15,
  },
  descriptionText: {
    color: colors.white
  },
});

class JobInfoScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.jobInfo.company_name}`,
  });

  constructor(props) {
    super(props);
    this.state = { jobInfo: null };
  }

  componentWillMount = () => {
    axios.get(userAPI.jobs.jobData, { params: {
          access_token: this.props.token,
          client_id: this.props.navigation.state.params.jobInfo.client_id
        }
      })
        .then((res) => this.setState({ jobInfo: res.data }))
        .catch((err) => console.log(err));
  };

  _renderContent() {
    if (this.state.jobInfo != null) {
      const { client_info } = this.state.jobInfo;
      return (
        <View style={styles.inner}>
          <ScrollView>
            <View style={styles.descriptionMain}>
              <View style={styles.descriptionBox}>
                <Image
                  style={styles.logo}
                  source={require('../../images/logoblack.png')}
                />
              </View>
                {client_info.company_name != null ?
                  <View style={styles.jobTitle}>
                    <Text style={styles.jobLabelLeft}>Job Position: </Text>
                    <Text style={styles.jobLabelRight}>position  here</Text>
                  </View>
                : null
                }
              <View style={styles.description}>
                {client_info.company_name != null ? <Text style={styles.descriptionText}>Description here</Text> : null}
              </View>
            </View>
            <View>
              {client_info.telephone != null ? <JobItemInfo label={strings.jobInfoLabel.phone} content={client_info.telephone} /> : null}
              {client_info.address1 != null ? <JobItemInfo label={strings.jobInfoLabel.addressOne} content={client_info.address1} /> : null}
              {client_info.address2 != null ? <JobItemInfo label={strings.jobInfoLabel.addressTwo} content={client_info.address2} /> : null}
              {client_info.city != null ? <JobItemInfo label={strings.jobInfoLabel.city} content={client_info.city} /> : null}
              {client_info.state != null ? <JobItemInfo label={strings.jobInfoLabel.state} content={client_info.state} /> : null}
              {client_info.zip != null ? <JobItemInfo label={strings.jobInfoLabel.zip} content={client_info.zip} /> : null}
            </View>
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
          {this._renderContent()}
        <StatusBar hidden />
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.accessToken,
  };
};

export default connect(mapStateToProps, null)(JobInfoScreen);
