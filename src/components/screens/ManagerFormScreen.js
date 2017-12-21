import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, Switch, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
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
  priority: {
    flexDirection: 'row',
    marginTop: 20,
  },
  priorityRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  priorityRightInner: {
    flexDirection: 'row',
  },
  switchStyle: {
    marginLeft: 10,
    marginRight: 10,
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
  }
});

class ManagerFormScreen extends Component {

  //TODO: NEED TO HAVE A PROP FOR TO: {reciever}

  componentDidMount = () => {
    console.log(this.props);
  }
  _handleClick = () => {
    console.log('asdf');
  }

  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <ScrollView style={styles.inner}>
          <View style={styles.receiver}>
            <Text style={styles.bold}>To:</Text>
            <Text style={styles.light}>{this.props.navigation.state.params.messageInfo.receiver}</Text>
          </View>
          <View style={styles.subject}>
            <Text style={styles.bold}>Subject:</Text>
            <TextInput
              style={styles.textfield}
              value={this.props.navigation.state.params.messageInfo.subject}
            />
          </View>
          <View style={styles.priority}>
            <Text style={styles.bold}>Priority:</Text>
            <View style={styles.priorityRight}>
              <View style={styles.priorityRightInner}>
                <Text style={styles.light}>Public</Text>
                <Switch style={styles.switchStyle} />
                <Text style={styles.light}>Private</Text>
              </View>
            </View>
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

export default connect(null, null)(ManagerFormScreen);
