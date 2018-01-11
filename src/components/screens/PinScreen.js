import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  AsyncStorage,
  Platform
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import ButtonColored from '../ButtonColored';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import LineSeperator from '../LineSeperator';
import * as AuthActions from '../../actions/AuthActions';
import * as userAPI from '../../lib/api/userAPI';

const styles = StyleSheet.create({
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
  textfield: {
     height: 40,
     width: '100%',
     color: colors.white,
     textAlign: 'center',
     ...Platform.select({
       ios: {
         borderBottomColor: colors.borderGray,
         borderBottomWidth: 1,
       }
     })
  },
  sectionTwo: {
    width: '100%',
    marginBottom: 10,
  },
  forgotBttn: {
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class PinScreen extends PureComponent {

  static navigationOptions = {
    header: null,
  };


  constructor(props) {
    super(props);
    //TODO: remove state username/password values
    this.state = {
      error: null,
      username: null,
      password: null,
      appKey: null,
      typedAppKey: null
    };
  }

  componentWillMount = () => {
    this._grabData();
  }

  componentDidMount = () => {

  }

  async _grabData() {
    // TODO: grab username and password from local and save to state
    const appKey = await AsyncStorage.getItem('appKey');
    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password');
    this.setState({ appKey, username, password });
  }

  _handleLogIn = () => {
    if (this.state.appKey === this.state.typedAppKey) {
      this.props.makeSignInRequest(this.state.username, this.state.password);
    } else {
      this.setState({ error: 'Incorrect Pin' });
    }
  }

  _handleForgot = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <Image source={require('../../images/logowhite.png')} style={styles.logo} />
          {this.state.error != null ?
            <Text>{this.state.error}</Text>
          : null}
          <View style={styles.section}>
            <TextInput
              style={styles.textfield}
              value={this.state.typedAppKey}
              onChangeText={(text) =>this.setState({ typedAppKey: text })}
            />
          </View>
          <View style={styles.sectionTwo}>
            <ButtonColored label={strings.logIn} clicked={this._handleLogIn} />
          </View>
          <View style={styles.sectionTwo}>
            <TouchableOpacity style={styles.forgotBttn} onPress={this._handleForgot}>
              <Text style={styles.buttonTxtOnlyText}>{strings.forgotPinTxt}</Text>
            </TouchableOpacity>
          </View>
        </View>
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

export default connect(mapStateToProps, AuthActions)(PinScreen);
