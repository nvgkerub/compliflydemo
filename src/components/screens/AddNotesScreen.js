import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as textStyle from '../../constants/textStyle';
import HeaderRightTextButton from '../HeaderRightTextButton';

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
  bold: {
    fontWeight: 'bold',
    color: colors.white,
    marginRight: 10,
  },
  subject: {
  },
  textfield: {
    fontSize: textStyle.fontSize.input,
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
  messageInput: {
    fontSize: textStyle.fontSize.input,
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
});

class AddNotesScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <HeaderRightTextButton navigation={navigation} label="Save" />
      )
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: '',
      message: '',
    };
  }

  componentDidMount = () => {
    this.props.navigation.setParams({ save: this._saveNote.bind(this) });
    this._grabData();
  }

  async _grabData() {
    const data = await AsyncStorage.getItem('noteList');
    if (data != null) {
      this.setState({ data: JSON.parse(data) });
    }
  }

  _saveNote() {
    const { title, message } = this.state;
    if (title === '' || message === '') {
      Alert.alert(
        'Failed',
        'Please fill all inputs.',
        [
          { text: 'ok' },
        ],
        { cancellable: false }
      );
    } else {
      this._save();
    }
  }

  _save() {
    const { data, title, message } = this.state;
    const note = { title, message, note_id: data.length + 1 };
    data.push(note);
    AsyncStorage.setItem('noteList', JSON.stringify(data));
    this.props.navigation.state.params.refresh();
    this.props.navigation.goBack();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
          <ScrollView style={styles.inner}>
            <View style={styles.subject}>
              <Text style={styles.bold}>Title:</Text>
              <TextInput
                style={styles.textfield}
                value={this.state.title}
                onChangeText={(title) => this.setState({ title })}
              />
            </View>
            <View style={styles.message}>
              <Text style={styles.bold}>Note:</Text>
              <TextInput
                style={styles.messageInput}
                value={this.state.message}
                onChangeText={(message) => this.setState({ message })}
                multiline
                numberOfLines={6}
                placeholder="Your notes here..."
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(null, null)(AddNotesScreen);
