import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
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
  messageContainer: {
    marginTop: 20,
    flexDirection: 'column',
  },
  note: {
    marginTop: 10,
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
  }
});

class ViewNoteScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'View Note',
  });

  constructor(props) {
    super(props);
    this.state = { data: null, loading: true };
  }

  render() {
    const { note_id, title, message } = this.props.navigation.state.params.note;
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.textContainer}>
            <Text style={styles.bold}>{strings.note.title}</Text>
            <Text style={styles.light}>{ title }</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.bold}>{strings.note.note}</Text>
            <View style={styles.note}>
              <Text style={styles.light}>{ message }</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Image source={require('../../images/setting.png')} />
          </View>
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

export default connect(mapStateToProps, null)(ViewNoteScreen);
