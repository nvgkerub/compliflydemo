import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  WebView,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as userAPI from '../../lib/api/userAPI';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: 'transparent',
    // padding: 15,
  },
  textContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bold: {
    fontWeight: '600',
    color: colors.white,
  },
  light: {
    fontWeight: '300',
    marginLeft: 10,
    color: colors.white,
  },
  message: {
    height: 300,
    marginTop: 20,
  },
  buttonContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  webview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 30,
  }
});

class ViewFileScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'View File',
  });

  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <WebView style={styles.webview} source={{ uri: this.props.navigation.state.params.file.uri }} />
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.session.accessToken
  };
};

export default connect(mapStateToProps, null)(ViewFileScreen);
