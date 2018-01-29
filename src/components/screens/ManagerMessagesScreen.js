import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as english from '../../constants/strings';
import * as spanish from '../../constants/spanish';
import * as routeNames from '../../constants/routeNames';
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

class ManagerMessagesScreen extends Component {

  _handleClick = () => {
    this.props.navigation.navigate(routeNames.direct.form);
  }

  render() {
    var strings = null;
    if (this.props.language === 'spanish') {
      strings = spanish;
    } else {
      strings = english;
    }
    const { managerTopic } = strings;
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.label}>{strings.chooseTopic}</Text>
          <MessagesButtons
            navigation={this.props.navigation}
            clicked={this._handleClick}
            receiver={strings.formReceiver.manager}
            label={[managerTopic.late, managerTopic.timeOff, managerTopic.sickDay, strings.customMssg]}
          />
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.session.language,
  };
};

export default connect(mapStateToProps, null)(ManagerMessagesScreen);
