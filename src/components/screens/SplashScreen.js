import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { signIn, makeSignInRequest } from '../../actions/AuthActions';
import * as colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
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
});

class SplashScreen extends Component {

  static propTypes = {
    session: PropTypes.any,
	};

  constructor(props) {
    super(props);
    this.state = { appKey: null };
  }

  componentWillMount = () => {
    this._checkAppKey();
  }

  componentDidMount = () => {
    console.log('before mount', this.props);
  }

  async _checkAppKey() {
    const appKey = await AsyncStorage.getItem('appKey');
    if (appKey === null) {
      this.props.navigation.navigate('Login');
    } else {
      this.props.navigation.navigate('Pin');
    }
  }

  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <Image source={require('../../images/logowhite.png')} style={styles.logo} />
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

export default connect(mapStateToProps, null)(SplashScreen);
