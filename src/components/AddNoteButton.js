import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as strings from '../constants/strings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    marginRight: 10,
  }
});

class AddNoteButton extends Component {

  _handleClicked = () => {
    this.props.navigation.navigate('Add');
  }

  render() {
    return (
      <TouchableOpacity onPress={this._handleClicked}>
        <View style={styles.container}>
          <Image style={styles.image} source={require('../images/write.png')} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, null)(AddNoteButton);
