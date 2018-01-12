import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as textStyle from '../constants/textStyle';
import * as iconStyle from '../constants/iconStyle';
import { grabUserPic } from '../actions/ProfileActions';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 5,
  },
  inner: {
    flexDirection: 'row',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.white,
    marginRight: 15,
    backgroundColor: colors.blueGray,
  },
  pill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blueGray,
    flex: 1,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 10,
  },
  textBold: textStyle.bold,
  textLight: textStyle.light,
  settingIcon: iconStyle.setting,
});

class TopProfileSection extends Component {

  _clicked = () => {
    this.props.nav();
  }

  _renderContent = () => {
    return (
      <View style={styles.inner}>
        {
          this.props.profileUrl != null
          ?
            <Image
              style={styles.profilePic}
              source={{ uri: this.props.profileUrl }}
            />
          :
            <Image
              style={styles.profilePic}
            />
        }
        <View style={styles.pill}>
          <View>
            <Text style={styles.textBold}>
              {this.props.profile != null ? this.props.profile.first_name : 'first name' }
            </Text>
            <Text style={styles.textLight}>
              {this.props.profile != null ? this.props.profile.last_name : 'last name' }
            </Text>
          </View>
          <TouchableOpacity onPress={this._clicked}>
            <View>
              <Image style={styles.settingIcon} source={require('../images/setting.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderContent()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.session.accessToken,
    profileUrl: state.profile.userProfilePic
  };
};

export default connect(mapStateToProps, { grabUserPic })(TopProfileSection);
