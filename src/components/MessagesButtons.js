import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as routeNames from '../constants/routeNames';
import * as english from '../constants/strings';
import * as spanish from '../constants/spanish';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class MessagesButtons extends Component {

  _handleClick = (subject) => {
    this.props.navigation.navigate(routeNames.direct.form, { messageInfo: { subject, receiver: this.props.receiver } });
  }

  _renderButtons = () => {
    var strings = null;
    if (this.props.language === 'spanish') {
      strings = spanish;
    } else {
      strings = english;
    }
    return this.props.label.map((item, i) => {
      if (item === strings.customMssg) {
        return (
          <Button key={i} clicked={this._handleClick.bind(this, ' ')} label={item} />
        );
      }
      return (
        <Button key={i} clicked={this._handleClick.bind(this, item)} label={item} />
      );
    });
  }

  render() {
    return (
      <View>
        {this._renderButtons()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.session.language,
  };
};

export default connect(mapStateToProps, null)(MessagesButtons);
