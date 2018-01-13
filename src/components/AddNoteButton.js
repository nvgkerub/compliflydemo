import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import * as iconStyle from '../constants/iconStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: iconStyle.note.newnote,
});

class AddNoteButton extends Component {

  _handleClicked = () => {
    this.props.navigation.navigate('Add', {
      refresh: this._handleRefresh
    });
  }

  _handleRefresh = () => {
    this.props.navigation.state.params.refresh();
  }

  render() {
    return (
      <TouchableOpacity onPress={this._handleClicked}>
        <View style={styles.container}>
          <Image style={styles.image} source={require('../images/newnote2x.png')} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, null)(AddNoteButton);
