import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import MessagesButtons from '../MessagesButtons';

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
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
  },
});

class ExecutiveMessagesScreen extends Component {

  _handleClick = () => {
    this.props.navigation.navigate('Form');
  }

  render() {
    const { executiveTopic } = strings;
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.label}>Choose Topic</Text>
          <MessagesButtons
            navigation={this.props.navigation}
            clicked={this._handleClick}
            receiver={strings.formReceiver.executive}
            label={[executiveTopic.issue, executiveTopic.harrasment, executiveTopic.solution]}
          />
        </View>
      </LinearGradient>
    );
  }
}

export default connect(null, null)(ExecutiveMessagesScreen);
