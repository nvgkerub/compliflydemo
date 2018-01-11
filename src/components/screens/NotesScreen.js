import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import lodash from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../SearchBar';
import ListItem from '../ListItem';
import AddNoteButton from '../AddNoteButton';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';

const filler = [
  { title: 'Filename.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'Filename.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'Filename.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'Filename.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'Filename.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'Filename.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'Filename.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'Filename.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'Filename.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'Filename.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'Filename.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'Test.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
  { title: 'LastItem.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

class NotesScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <AddNoteButton navigation={navigation} />
      )
    };
  }

  constructor(props) {
    super(props);
    this.state = { data: filler, searchTerm: '' };
  }

  _renderItems = () => {
    if (this.state.searchTerm !== '') {
      const searched = lodash.filter(this.state.data, { title: this.state.searchTerm });
      return searched.map((item, i) => {
        return (
          <ListItem
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
        <ListItem
          key={i}
          title={item.title}
          subTitle={item.subTitle}
          navigations={this.props.navigation}
        />
      );
    });
  }

  _handleSearch = (text) => {
    this.setState({ searchTerm: text });
  }

  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <SearchBar handleSearch={this._handleSearch} />
          <ScrollView>
            {this._renderItems()}
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

export default connect(null, null)(NotesScreen);
