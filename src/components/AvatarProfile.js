import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import * as colors from '../constants/colors';
import Avatar from './Avatar';
import { uploadProfilePic } from '../actions/ProfileActions';

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class AvatarProfile extends Component {
  //TODO: SEND USER INFO OBJECT TO AvatarProfile

  constructor(props) {
    super(props);
    this.state = { avatarSource: null };
  }

  _handleUploadPic = () => {
    // Options for ImagePicker
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response from Image = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.err) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.props.uploadProfilePic(this.props.token, response.uri);
        this.setState({ avatarSource: source });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Avatar
          user={this.props.user}
          uploadPic={this._handleUploadPic}
          picLink={this.state.avatarSource}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.session.accessToken,
  };
};

export default connect(mapStateToProps, {
  uploadProfilePic
})(AvatarProfile);
