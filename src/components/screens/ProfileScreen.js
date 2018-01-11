import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  TextInput,
  ScrollView,
  Platform,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as strings from '../../constants/strings';
import * as colors from '../../constants/colors';
import AvatarProfile from '../AvatarProfile';
import ProfileItems from '../ProfileItems';
import ButtonColored from '../ButtonColored';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  textfield: {
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
  },
});

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { appKey: null, changedPinTxt: null };
  }

  componentWillMount = () => {
    this._getAppKey();
  }

  async _getAppKey() {
    const appKey = await AsyncStorage.getItem('appKey');
    this.setState({ appKey });
  }

  async _setAppKey() {
    await AsyncStorage.setItem('appKey', this.state.appKey);
    this.setState({ appKey: this.state.appKey });
  }

  _handleChangePin(pin) {
    AsyncStorage.setItem('appKey', pin);
    this.setState({ changedPinTxt: 'Succesfully changed pin' });
  }


  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <ScrollView>
            <AvatarProfile user={this.props.profile} />
            <ProfileItems user={this.props.profile} />
            <Text style={styles.changedPinStyle}>{strings.pinProfileLabel}</Text>
            <TextInput
              style={styles.textfield}
              value={this.state.appKey === null ? '' : this.state.appKey}
              onChangeText={(appKey) => this.setState({ appKey })}
            />
            <View style={styles.buttonContainer}>
              {
                this.state.changedPinTxt != null ?
                  <Text style={styles.changedPinStyle}>{this.state.changePinTxt}</Text> :
                null
              }
              <ButtonColored label={strings.changePin} clicked={this._handleChangePin.bind(this,this.state.appKey)} />
            </View>
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
  };
};

export default connect(mapStateToProps, null)(ProfileScreen);
