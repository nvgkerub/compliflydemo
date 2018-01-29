import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import * as userAPI from '../../lib/api/userAPI';
import * as textStyle from '../../constants/textStyle';
import * as iconStyle from '../../constants/iconStyle';
import ButtonColored from '../ButtonColored';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
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
    alignItems: 'center',
  },
  bold: textStyle.boldForm,
  light: textStyle.lightForm,
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
    alignItems: 'center',
  },
  uploadIcon: iconStyle.upload,
  uploadTxt: textStyle.light,
});

class InboxFormScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { subject: '', priority: null, message: '', fileSource: null, extention: '.jpg' };
  }

  componentDidMount = () => {
    this.setState({
      subject: this.props.navigation.state.params.message.subject,
      priority: 0
    });
  }

  _mssgWithoutFile = () => {
    const { subject, priority, message } = this.state;
    const { message_id } = this.props.navigation.state.params.message;
    const mssg = `access_token=${this.props.token}&message_id=${message_id}&subject=${subject}&description=${message}&is_public=${priority}`;

    axios.post(userAPI.message.replyMessage, mssg)
    .then((res) => (
      res.data.status === 'success'
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
    .catch((err) => (
      console.log('err replying', err)
    ));
  }

  _mssgWithFile = () => {
    const { subject, priority, message, fileSource, extention } = this.state;
    const { message_id } = this.props.navigation.state.params.message;
    console.log('file', fileSource);
    const body = new FormData();
    body.append('access_token', this.props.token);
    body.append('type', null);
    body.append('subject', subject);
    body.append('description', message);
    body.append('extention', extention);
    body.append('is_public', priority);
    body.append('message_id', message_id);
    body.append('file_path', {
      uri: fileSource,
      type: 'image/jpg',
      name: 'mssgreply'
    });
    fetch(userAPI.message.replyMessage, {
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
    if (this.state.fileSource === null) {
      this._mssgWithoutFile();
    } else {
      this._mssgWithFile();
    }
  }

  _handleUploadPic = () => {
    // Options for ImagePicker
    const options = {
      title: 'Select file to upload',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      takePhotoButtonTitle: null,
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response from Image = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.err) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({ fileSource: response.uri });
        Alert.alert(
          'Upload',
          'File has been attached successfully',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        );
      }
    });
  }

  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <KeyboardAwareScrollView>
          <ScrollView style={styles.inner}>
            <View style={styles.receiver}>
              <Text style={styles.bold}>To:</Text>
              <Text style={styles.light}>{this.props.navigation.state.params.message.added_by}</Text>
            </View>
            <View style={styles.subject}>
              <Text style={styles.bold}>Subject:</Text>
              <TextInput
                style={styles.textfield}
                value={this.state.subject}
                onChangeText={(subject) => this.setState({ subject })}
              />
            </View>
            <View style={styles.fileButtonContainer}>
              <Text style={styles.bold}>File Upload:</Text>
              <TouchableOpacity onPress={this._handleUploadPic.bind(this)}>
                <Image style={styles.uploadIcon} source={require('../../images/upload2x.png')} />
              </TouchableOpacity>
            </View>
            {this.state.fileSource != null ?
              <View>
                <Text style={styles.uploadTxt}>File uploaded successfully</Text>
              </View>
            : null }
            <View style={styles.message}>
              <Text style={styles.bold}>Message:</Text>
                <TextInput
                  style={styles.messageInput}
                  multiline
                  numberOfLines={6}
                  onChangeText={(message) => this.setState({ message })}
                />
            </View>
            <View style={styles.buttonContainer}>
              <ButtonColored label={strings.form.sendButton} clicked={this._handleClick} />
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.session.accessToken
  };
};

export default connect(mapStateToProps, null)(InboxFormScreen);
