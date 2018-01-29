import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  TextInput,
  ScrollView,
  Platform,
  Text,
  Picker,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as strings from '../../constants/strings';
import * as colors from '../../constants/colors';
import * as textStyle from '../../constants/textStyle';
import AvatarProfile from '../AvatarProfile';
import ProfileItems from '../ProfileItems';
import ButtonColored from '../ButtonColored';
import { updateLang } from '../../actions/AuthActions';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: 'transparent',
    marginBottom: 30,
  },
  textfield: {
    fontSize: textStyle.fontSize.input,
    height: 40,
    marginTop: 10,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
    color: colors.white,
    backgroundColor: colors.blueGray,
    borderRadius: 5,
    ...Platform.select({
     ios: {
       borderBottomColor: colors.borderGray,
       borderBottomWidth: 1,
     }
    })
  },
  buttonContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  changedPinStyle: {
    color: colors.white,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: textStyle.fontSize.bold,
  },
  picker: {
    height: 60,
    marginLeft: 15,
    marginRight: 15,
    // color: colors.white,
  },
  pickerItem: {
    height: 60,
    color: colors.white,
    fontSize: textStyle.fontSize.input,
  }
});

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { appKey: null, changedPinTxt: null, language: null };
  }

  componentWillMount = () => {
    this._getProfile();
  }

  async _getProfile() {
    const appKey = await AsyncStorage.getItem('appKey');
    const language = await AsyncStorage.getItem('language');
    this.setState({ appKey, language });
  }

  _handleUpdateProfile() {
    const { appKey } = this.state;
    AsyncStorage.setItem('appKey', appKey);
    this.props.updateLang(this.state.language);
    Alert.alert(
      'Successfull',
      'Profile has been updated.',
      [
        { text: 'Ok', onPress: () => this.props.navigation.state.params.refresh() }
      ],
      { cancelable: false }
    );
  }


  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.inner}>
            <ScrollView>
              <AvatarProfile user={this.props.profile} />
              <ProfileItems user={this.props.profile} />
              <Text style={styles.changedPinStyle}>{strings.languageLabel}</Text>
              <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={this.state.language}
                onValueChange={(itemValue) => this.setState({ language: itemValue })}
              >
                <Picker.Item label="English" value="english" />
                <Picker.Item label="Spanish" value="spanish" />
              </Picker>
              <Text style={styles.changedPinStyle}>{strings.pinProfileLabel}</Text>
              <TextInput
                style={styles.textfield}
                value={this.state.appKey === null ? '' : this.state.appKey}
                onChangeText={(appKey) => this.setState({ appKey })}
              />
              <View style={styles.buttonContainer}>
                {
                  this.state.changedPinTxt != null ?
                    <Text style={styles.changedPinStyle}>{this.state.changedPinTxt}</Text> :
                  null
                }
                {this.state.appKey != null ?
                  <ButtonColored
                    label={strings.updateProfile}
                    clicked={this._handleUpdateProfile.bind(this)}
                  />
                  :
                  null
                }
              </View>
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.session.accessToken,
    profile: state.profile.userProfile,
  };
};

export default connect(mapStateToProps, {
  updateLang
})(ProfileScreen);
