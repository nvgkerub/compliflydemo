import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import lodash from 'lodash';
import SearchBar from '../SearchBar';
import AudioItem from '../AudioItem';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';

const filler = [
  { title: 'audio.mp3', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'audio2.mp4', subTitle: '683 MB, modified yesterday 4:25 PM' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: 'transparent',
  }
});

class LibraryAudioScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { data: filler, searchTerm: '' };
  }

  _renderItems = () => {
    if (this.state.searchTerm !== '') {
      const searched = lodash.filter(this.state.data, { title: this.state.searchTerm });
      return searched.map((item, i) => {
        return (
          <AudioItem
            key={i}
            title={item.title}
            subTitle={item.subTitle}
            navigations={this.props.navigation}
          />
        );
      });
    }
    return filler.map((item, i) => {
      return (
        <AudioItem key={i} title={item.title} subTitle={item.subTitle} />
      );
    });
  }

  _handleSearch = (text) => {
    this.setState({ searchTerm: text });
  }

  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <SearchBar handleSearch={this._handleSearch} />
          <ScrollView>
            {this._renderItems()}
          </ScrollView>
        </View>
        <StatusBar hidden />
      </LinearGradient>
    );
  }
}

export default connect(null, null)(LibraryAudioScreen);
