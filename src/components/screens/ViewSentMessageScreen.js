import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
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
    padding: 15,
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
  }
});

class ViewSentMessageScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'View Sent Message',
  });

  constructor(props) {
    super(props);
    this.state = { data: null, loading: true };
  }

  componentWillMount = () => {
    axios.get(userAPI.message.retrieveMessage, { params: {
        access_token: this.props.token,
        message_id: this.props.navigation.state.params.message.message_id
      }
    })
      .then((res) => this.setState({ data: res.data.response }))
      .catch((err) => console.log('error inside of view message', err));
  }

  _renderItems() {
    if (this.state.data != null) {
      return (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.bold}>{strings.form.to}</Text>
            <Text style={styles.light}>{ this.state.data.send_to_users }</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.bold}>{strings.form.from}</Text>
            <Text style={styles.light}>{ this.state.data.added_by }</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.bold}>{strings.form.date}</Text>
            <Text style={styles.light}>{ this.state.data.added_date }</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.bold}>{strings.form.subject}</Text>
            <Text style={styles.light}>{ this.state.data.subject }</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.bold}>{strings.form.message}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.light}>{this.state.data.description}</Text>
          </View>
        </View>
      );
    }
    return (
      <View>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <ScrollView>
            {this._renderItems()}
          </ScrollView>
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

export default connect(mapStateToProps, null)(ViewSentMessageScreen);
