import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import ButtonColored from '../ButtonColored';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import * as userAPI from '../../lib/api/userAPI';
import * as routeNames from '../../constants/routeNames';
import * as textStyle from '../../constants/textStyle';

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
  bold: textStyle.boldForm,
  light: textStyle.lightForm,
  message: {
    height: 300,
    marginTop: 20,
  },
  buttonContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  viewButton: {
    marginTop: 20,
  },
});

class ViewMessageScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'View Message',
    headerRight: (
      <Button
        title='Delete'
        onPress={() => navigation.state.params.handleDelete()}
      />
    )
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

  componentDidMount = () => {
    this.props.navigation.setParams({ handleDelete: this.handleDelete });
  }

  handleDelete = () => {
    console.log(this.props);
    axios.get(userAPI.message.deleteMessage, {
      params: {
        access_token: this.props.token,
        message_id: this.state.data.message_id,
      }
    })
      .then(res => (res.data.status === 'success' ? this._refreshDelete()
       : null))
      .catch(err => console.log('error deleting message', err));
  }

  _refreshDelete() {
    this.props.navigation.state.params.refresh();
    this.props.navigation.goBack();
  }

  _handleClick(message) {
    this.props.navigation.navigate(routeNames.inbox.reply, { message });
  }

  _viewFile() {
    this.props.navigation.navigate(routeNames.inbox.file, { file: {
      uri: this.state.data.file_path,
      }
    });
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
          {
            this.state.data.file_path === null
            ?
            null
            :
            <TouchableOpacity onPress={this._viewFile.bind(this)} style={styles.viewButton}>
              <Text style={styles.bold}>{strings.form.viewFile}</Text>
            </TouchableOpacity>
          }
          <View style={styles.buttonContainer}>
            <ButtonColored
              label={strings.form.replyButton}
              clicked={this._handleClick.bind(this, this.state.data)}
            />
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
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
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

export default connect(mapStateToProps, null)(ViewMessageScreen);
