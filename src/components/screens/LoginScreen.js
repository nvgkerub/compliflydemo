import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  AsyncStorage,
  Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UsernameField from '../UsernameField';
import PasswordField from '../PasswordField';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import LineSeperator from '../LineSeperator';
import * as AuthActions from '../../actions/AuthActions';
import * as routeNames from '../../constants/routeNames';

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingLeft: 30,
    paddingRight: 30,
  },
  logo: {
    marginBottom: 20,
    height: 200,
    resizeMode: 'contain',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: colors.teal,
    borderRadius: 5,
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
  },
  buttonTxt: {
    color: colors.white,
  },
  buttonTxtOnly: {
    alignItems: 'center',
  },
  buttonTxtOnlyText: {
    color: colors.white,
  },
  SignUpButtons: {
    alignItems: 'center',
    marginTop: 10,
  },
  error: {
    color: colors.white,
  }
});

class LoginScreen extends PureComponent {

  static navigationOptions = {
    header: null,
  };


  constructor(props) {
    super(props);
    //TODO: remove state username/password values
    this.state = { username: null, password: null };
  }

  componentWillMount = () => {
    this._grabData();
  }

  async _grabData() {
    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password');

    this.setState({ username, password });
  }

  _handleLogIn = () => {
    this.props.makeSignInRequest(this.state.username, this.state.password);
  }
  _handleUsername = (text) => {
    this.setState({ username: text });
  }
  _handlePassword = (text) => {
    this.setState({ password: text });
  }
  navigateToDash = () => {
    this.props.navigation.navigate(routeNames.root.drawer);
  }

  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.wrapper}>
              <View style={styles.inner}>
                <Image source={require('../../images/logowhite.png')} style={styles.logo} />
                {this.props.error != null ?
                  <Text style={styles.error}>{this.props.error}</Text>
                : null}
                <View style={styles.section}>
                  <UsernameField handleTxtChange={this._handleUsername} />
                </View>
                <View style={styles.section}>
                  <PasswordField handleTxtChange={this._handlePassword} />
                </View>
                <View style={styles.section}>
                  <TouchableOpacity style={styles.button} onPress={this._handleLogIn}>
                    <Text style={styles.buttonTxt}>{strings.logIn}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.section}>
                  <TouchableOpacity style={styles.buttonTxtOnly}>
                    <Text style={styles.buttonTxtOnlyText}>{strings.forgotPassword}</Text>
                  </TouchableOpacity>
                </View>
                <LineSeperator />
                <View style={styles.sectionTwo}>
                  <TouchableOpacity style={styles.SignUpButtons}>
                    <Text style={styles.buttonTxtOnlyText}>{strings.signUp}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.session.error,
    accessToken: state.session.accessToken
  };
};

export default connect(mapStateToProps, AuthActions)(LoginScreen);
