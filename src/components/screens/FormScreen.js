import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import * as userAPI from '../../lib/api/userAPI';
import ButtonColored from '../ButtonColored';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
  },
  inner: {
    backgroundColor: 'transparent',
  },
  label: {
    color: colors.white,
    fontWeight: 'bold',
  },
  receiver: {
    flexDirection: 'row',
  },
  bold: {
    fontWeight: 'bold',
    color: colors.white,
    marginRight: 10,
  },
  light: {
    color: colors.white,
  },
  subject: {
    marginTop: 20,
  },
  textfield: {
     height: 40,
     marginTop: 10,
     paddingLeft: 10,
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
  message: {
    marginTop: 20,
  },
  messagesContainer: {

  },
  messageInput: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 200,
    width: '100%',
    textAlign: 'left',
    color: colors.white,
    backgroundColor: colors.blueGray,
    borderRadius: 5,
    textAlignVertical: 'top',
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
  fileButtonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadIcon: {
    width: 30,
    resizeMode: 'contain',
  }
});

class FormScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subject: null,
      description: null,
      fileSource: null,
      extention: 'jpg',
      type: null,
    };
  }

  componentWillMount = () => {
    const { receiver, subject } = this.props.navigation.state.params.messageInfo;
    console.log(this.props.navigation.state.params.messageInfo);
    this.setState({ receiver, subject });
    this._handleType();
  }

  _handleType() {
    switch (this.props.navigation.state.params.messageInfo.receiver) {

      case strings.formReceiver.manager:
        return this.setState({ type: strings.formClientType.manager });

      case strings.formReceiver.hr:
        return this.setState({ type: strings.formClientType.hr });

      case strings.formReceiver.safety:
        return this.setState({ type: strings.formClientType.safety });

      case strings.formReceiver.executive:
        return this.setState({ type: strings.formClientType.executive });

      default:
        return this.setState({ type: strings.formClientType.manager });
    }
  }

  _mssgWithFile = () => {
    const { subject, description, fileSource, extention } = this.state;
    const body = new FormData();
    body.append('file_path', {
      uri: fileSource,
      type: 'image/jpg',
      name: 'mssgreply'
    });
    body.append('access_token', this.props.token);
    body.append('subject', subject);
    body.append('description', description);
    body.append('extention', extention);
    fetch(userAPI.message.sendMessageToClient, {
      method: 'POST',
      body
    })
    .then(res => (
      res.status === 200
      ?
        Alert.alert(
          'Success',
          'Message was sent successfully',
          [
            { text: 'OK', onPress: () => this.props.navigation.goBack() },
          ],
          { cancelable: false }
        )
      :
        Alert.alert(
          'Failed',
          'Message was not sent. Try again later.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
    ))
    .catch(err => console.log(err));
  }

  _handleClick = () => {
    this._mssgWithFile();
  }

  render() {
    const { receiver, subject } = this.props.navigation.state.params.messageInfo;
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <ScrollView style={styles.inner}>
          <View style={styles.receiver}>
            <Text style={styles.bold}>To:</Text>
            <Text style={styles.light}>{receiver}</Text>
          </View>
          <View style={styles.subject}>
            <Text style={styles.bold}>Subject:</Text>
            <TextInput
              style={styles.textfield}
              value={subject}
            />
          </View>
          <View style={styles.fileButtonContainer}>
            <Text style={styles.bold}>File Upload:</Text>
            <TouchableOpacity onPress={this._handleClick.bind(this)}>
              <Image style={styles.uploadIcon} source={require('../../images/library.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.message}>
            <Text style={styles.bold}>Message:</Text>
              <TextInput
                style={styles.messageInput}
                multiline
                numberOfLines={6}
              />
          </View>
          <View style={styles.buttonContainer}>
            <ButtonColored label={strings.form.sendButton} clicked={this._handleClick} />
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

export default connect(null, null)(FormScreen);
