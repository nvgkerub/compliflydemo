import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import ButtonColored from '../ButtonColored';
import { sendAudio } from '../../actions/SendingActions';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: 'transparent',
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
  },
  progressText: {
    fontSize: 30,
    color: colors.white,
    textAlign: 'center',
  },
  warningText: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  enterfile: {
    color: colors.white,
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  button: {
    // height: 50,
  },
  buttonIcon: {
    width: 25,
    resizeMode: 'contain',
  },
  disabledButtonText: {
    color: '#eee'
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  activeButtonText: {
    fontSize: 20,
    color: '#B81F00'
  },
  input: {
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
  }
});

class AudioScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/compliflyaudio.aac',
      hasPermission: undefined,
      warnings: null,
      name: null,
      finalPath: null,
    };
  }

  componentDidMount() {
    this._checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });

      if (!hasPermission) return;

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data) => {
        this.setState({ currentTime: Math.floor(data.currentTime) });
      };

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === 'OK', data.audioFileURL);
        }
      };
    });
  }


  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000
    });
  }

  _checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      title: 'Microphone Permission',
      message: 'AudioExample needs access to your microphone so you can record audio.'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        console.log('Permission result:', result);
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }

  _renderButton(title, onPress, active) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;

    switch (title) {

      case 'RECORD':
        return (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image style={styles.buttonIcon} source={require('../../images/recordicon.png')} />
          </TouchableOpacity>
        );

      case 'PLAY':
        return (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image style={styles.buttonIcon} source={require('../../images/playicon.png')} />
          </TouchableOpacity>
        );

      case 'STOP':
        return (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image style={styles.buttonIcon} source={require('../../images/stopicon.png')} />
          </TouchableOpacity>
        );

      case 'PAUSE':
        return (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image style={styles.buttonIcon} source={require('../../images/pauseicon.png')} />
          </TouchableOpacity>
        );

      default:
        return (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={style}>
              {title}
            </Text>
          </TouchableOpacity>
        );
    }

  }

  async _pause() {
    if (!this.state.recording) {
      this.setState({ warnings: 'Can\'t pause, not recording!' });
      // console.warn('Can\'t pause, not recording!');
      return;
    }

    this.setState({ stoppedRecording: true, recording: false });

    try {
      const filePath = await AudioRecorder.pauseRecording();

      // Pause is currently equivalent to stop on Android.
      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.recording) {
      this.setState({ warnings: 'Can\'t stop, not recording!' });
      // console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({ stoppedRecording: true, recording: false, warnings: 'Finished recording.' });

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async _play() {
    if (this.state.recording) {
      await this._stop();
    }

    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  async _record() {
    if (this.state.recording) {
      this.setState({ warnings: 'Already recording!' });
      // console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      this.setState({ warnings: 'Can\'t record, no permission granted!' });
      // console.warn('Can\'t record, no permission granted!');
      return;
    }

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({ recording: true, warnings: null });

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  _finishRecording(didSucceed, filePath) {
    this.setState({ finished: didSucceed, finalPath: filePath });
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
  }

  _handleClick = () => {
    this.props.sendAudio(this.props.token, this.state.finalPath, this.state.name);
    console.log('end of handleclick function audio');
  }

  _renderExtra = () => {
    return (
      <View>
        <Text style={styles.enterfile}>Enter name of audio file.</Text>
        <TextInput style={styles.input} onChangeText={(text) => this.setState({ name: text })} />
        <ButtonColored label={strings.form.sendButton} clicked={this._handleClick} />
      </View>
    );
  }


  render() {
    return (
      <LinearGradient colors={[colors.blue, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.progressText}>{this.state.currentTime}s</Text>
          <View style={styles.buttonContainer}>
            {this._renderButton('RECORD', () => { this._record(); }, this.state.recording)}
            {this._renderButton('PLAY', () => { this._play(); })}
            {this._renderButton('STOP', () => { this._stop(); })}
          </View>
          <Text style={styles.warningText}>{this.state.warnings === null ? null : this.state.warnings}</Text>
          {this.state.finished === true ? this._renderExtra() : null }
        </View>
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
  sendAudio
})(AudioScreen);
