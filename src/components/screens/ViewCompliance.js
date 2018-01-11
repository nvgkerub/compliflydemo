import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  WebView,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import ButtonColored from '../ButtonColored';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
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

class ViewCompliance extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.message.file_name,
  });

  constructor(props) {
    super(props);
    this.state = { filePath: null, loading: true };
  }

  componentWillMount = () => {
    const { file_path, compliance_id } = this.props.navigation.state.params.message;
    this.setState({ filePath: file_path });
    axios.get(userAPI.compliance.changeStatus, {
      params: {
        access_token: this.props.token,
        compliance_id
      }
    })
    .then(() => this.props.navigation.state.params.refresh())
    .catch(err => console.log(err));
  }

  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <WebView style={styles.webview} source={{ uri: this.state.filePath }} />
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

export default connect(mapStateToProps, null)(ViewCompliance);
