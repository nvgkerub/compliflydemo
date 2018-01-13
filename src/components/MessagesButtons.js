import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as routeNames from '../constants/routeNames';

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
    return this.props.label.map((item, i) => {
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

export default connect(null, null)(MessagesButtons);
