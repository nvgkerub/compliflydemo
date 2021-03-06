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
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import * as iconStyle from '../../constants/iconStyle';
import * as textStyle from '../../constants/textStyle';
import ButtonColored from '../ButtonColored';
import { sendMessageWithFile } from '../../actions/SendingActions';

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
  },
  bold: {
    fontWeight: textStyle.fontWeight.bold,
    color: colors.white,
    fontSize: textStyle.fontSize.bold,
    marginRight: 10,
  },
  light: textStyle.light,
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
  uploadIcon: iconStyle.upload,
  uploadTxt: textStyle.light,
});

class MediaFormScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subject: null,
      description: null,
      extention: 'jpg',
      fileSource: null,
      loading: false,
    };
  }

  componentDidMount = () => {
    this.setState({ subject: this.props.navigation.state.params.messageInfo.subject });
  }

  _handleClick = () => {
    this.props.sendMessageWithFile(
      this.props.token,
      this.state.subject,
      this.state.description,
      this.state.fileSource,
      this.state.extention
    );
    this.setState({ loading: false });
  }

  _handleUploadPic = () => {
    const { type } = this.props.navigation.state.params.messageInfo;
    const optionsVideo = {
      title: 'Select a video to upload',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      takePhotoButtonTitle: 'Take a video',
      mediaType: 'video',
      videoQuality: 'high',
    };
    const optionsPicture = {
      title: 'Select an image to pload',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(type === 'picture' ? optionsPicture : optionsVideo, (response) => {
      console.log('Response from Image = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.err) {
        Alert.alert(
          'Upload Failed',
          'File upload was not successfull. Please try again.',
          [
            { text: 'Ok' }
          ]
        );
      } else {
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({ fileSource: response.uri });
        Alert.alert(
          'Upload Success',
          'File was uploaded successfully',
          [
            { text: 'Ok' }
          ]
        );
      }
    });
  }

  _handleSubject(subject) {
    this.setState({ subject });
  }

  _handleDesc(description) {
    this.setState({ description });
  }

  _renderButton = () => {
    if (this.state.loading) {
      return <ActivityIndicator animating size='large' />;
    }
    return <ButtonColored label={strings.form.sendButton} clicked={this._handleClick} />;
  }

  render() {
    const { receiver } = this.props.navigation.state.params.messageInfo;
    return (
        <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
          <KeyboardAwareScrollView>
            <ScrollView style={styles.inner}>
              <View style={styles.receiver}>
                <Text style={styles.bold}>To:</Text>
                <Text style={styles.light}>{receiver}</Text>
              </View>
              <View style={styles.subject}>
                <Text style={styles.bold}>Subject:</Text>
                <TextInput
                  style={styles.textfield}
                  value={this.state.subject}
                  onChangeText={(text) => this._handleSubject(text)}
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
                    value={this.state.description}
                    onChangeText={(text) => this._handleDesc(text)}
                  />
              </View>
              <View style={styles.buttonContainer}>
                {this._renderButton()}
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.session.accessToken,
  };
};

export default connect(mapStateToProps, {
  sendMessageWithFile
})(MediaFormScreen);
