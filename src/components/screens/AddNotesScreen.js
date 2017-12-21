import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import HeaderRightTextButton from '../HeaderRightTextButton';

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
  bold: {
    fontWeight: 'bold',
    color: colors.white,
    marginRight: 10,
  },
  subject: {
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
});

class AddNotesScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <HeaderRightTextButton navigation={navigation} label="Save" />
      )
    };
  }

  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <ScrollView style={styles.inner}>
          <View style={styles.subject}>
            <Text style={styles.bold}>Title:</Text>
            <TextInput
              style={styles.textfield}
            />
          </View>
          <View style={styles.message}>
            <TextInput
              style={styles.messageInput}
              multiline
              numberOfLines={6}
              placeholder="Your notes here..."
            />
          </View>
          <View style={styles.buttonContainer}>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

export default connect(null, null)(AddNotesScreen);
