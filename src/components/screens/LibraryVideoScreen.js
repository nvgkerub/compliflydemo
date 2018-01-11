import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { List } from 'react-native-elements';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../SearchBar';
import VideoItem from '../VideoItem';
import * as colors from '../../constants/colors';
import * as strings from '../../constants/strings';
import * as userAPI from '../../lib/api/userAPI';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: 'transparent',
  }
});

class LibraryVideoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      filteredData: [],
      error: null,
      refreshing: false,
      term: '',
      sortData: [],
      sort: '',
    };
  }

  componentDidMount = () => {
    this._makeAPIRequest();
  }

  _makeAPIRequest = () => {
    this.setState({ loading: true });
    axios.get(userAPI.library.libraryPDF, { params: {
        access_token: this.props.token,
        date: 0,
      }
    })
    .then(res => this._splitData(res.data.response.librarydata))
    .catch(err =>
      this.setState({
        error: 'Error while loading Library list',
        loading: false,
        refreshing: false,
      }));
  }

  _splitData(d) {
    for (var i = 0; i <= d.length; i++) {
      var f = d[i].file_path.toUpperCase();
      if (
        f.includes(strings.libraryFileTypes.video.mov.toUpperCase()) ||
        f.includes(strings.libraryFileTypes.video.mp4.toUpperCase())
      ) {
        this.setState({ data: [...this.state.data, d[i]], loading: false, refreshing: false });
      }
    }
  }

  _handleClick(file) {
    this.props.navigation.navigate('ViewFile', { file });
  }

  _handleSearch(text) {
    const newData = this.state.data.filter(item => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      filteredData: newData,
      text,
      refreshing: false,
    });
  }

  _sortData(sort, data) {
    this.setState({ refreshing: false });
    data.sort((a, b) => {
      const itemA = sort === strings.filterType.abc ? a.title.toUpperCase() : a.created_datetime.toUpperCase();
      const itemB = sort === strings.filterType.abc ? b.title.toUpperCase() : b.created_datetime.toUpperCase();
      if (itemA < itemB) {
        return -1;
      }
      if (itemA > itemB) {
        return 1;
      }
      return 0;
    });
  }

  _handleSort(sort) {
    const d = this.state.filteredData.length === 0 ? this.state.data : this.state.filteredData;
    const arr = this.state.filteredData.length === 0 ? 'data' : 'filteredData';
    this.setState({ refreshing: true }, () => {
      this._sortData(sort, d);
    });
  }

  _renderHeader = () => {
    return (
      <SearchBar
        handleSearch={this._handleSearch.bind(this)}
        sortBy={this._handleSort.bind(this)}
      />
    );
  }

  _renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator animating size='large' />
      </View>
    );
  }

  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <SearchBar
            handleSearch={this._handleSearch.bind(this)}
            sortBy={this._handleSort.bind(this)}
          />
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0, backgroundColor: 'transparent' }}>
            <FlatList
              data={
                this.state.filteredData.length === 0 ?
                this.state.data : this.state.filteredData
              }
              renderItem={({ item }) => (
                <VideoItem
                  title={item.title}
                  subTitle={item.created_datetime}
                  handleClick={this._handleClick.bind(this, item)}
                />
              )}
              keyExtractor={item => item.library_id}
              ListFooterComponent={this._renderFooter}
              refreshing={this.state.refreshing}
              onRefresh={this._handleRefresh}
            />
          </List>
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.session.accessToken,
  };
};

export default connect(mapStateToProps, null)(LibraryVideoScreen);
