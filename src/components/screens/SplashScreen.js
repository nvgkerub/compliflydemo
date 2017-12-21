import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn, makeSignInRequest } from '../../actions/AuthActions';
import * as colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
  }
});

class SplashScreen extends Component {

  static propTypes = {
    session: PropTypes.any,
	};

  componentWillMount = () => {
    //this.props.signIn();
  }

  componentDidMount = () => {
    console.log('before mount', this.props);
  }

  _handleClick = () => {
    console.log(this.props);
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Splash HERE</Text>
        {this.props.isAuthenticated ? <Text>Authenticated</Text> : <Text>Non Authenticated</Text>}
        <TouchableOpacity onPress={this._handleClick}>
          <Text>test</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

export default connect(mapStateToProps, { signIn, makeSignInRequest })(SplashScreen);
