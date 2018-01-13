import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../SearchBar';
import ListItemIcon from '../ListItemIcon';
import * as colors from '../../constants/colors';
import * as userAPI from '../../lib/api/userAPI';
import * as strings from '../../constants/strings';
import * as textStyle from '../../constants/textStyle';
import * as routeNames from '../../constants/routeNames';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingBox: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  txt: {
    marginTop: 20,
    textAlign: 'center',
    color: colors.white,
    fontSize: textStyle.fontSize.light,
    fontWeight: textStyle.fontWeight.light,
  }
});

class InboxScreen extends Component {

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

  componentWillMount = () => {
    this._makeAPIRequest();
  }

  _handleClick = (message) => {
    this.props.navigation.navigate(routeNames.inbox.view, { message, refresh: this._makeAPIRequest });
  }

  _makeAPIRequest = () => {
    console.log('reached');
    this.setState({ loading: true });
    axios.get(userAPI.message.retrieveInbox, {
      params: {
        access_token: this.props.token,
        date: 0,
      }
    })
      .then((res) => (
        Array.isArray(res.data.response)
        ?
        this.setState({ data: res.data.response, loading: false, refreshing: false, })
        :
        this.setState({ error: res.data.response.message, loading: false, refreshing: false, })
      ))
      .catch((err) => console.log('library err', err));
  }

  _handleSearch(text) {
    const newData = this.state.data.filter(item => {
      const itemData = item.subject.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      filteredData: newData,
      text,
      refreshing: false,
    });
  }

  _handleSort(sort) {
    const d = this.state.filteredData.length === 0 ? this.state.data : this.state.filteredData;
    const arr = this.state.filteredData.length === 0 ? 'data' : 'filteredData';
    this.setState({ refreshing: true }, () => {
      this._sortData(sort, d, arr);
    });
  }

  _sortData(sort, data) {
    this.setState({ refreshing: false });
    data.sort((a, b) => {
      const itemA = sort === strings.filterType.abc ? a.subject.toUpperCase() : a.added_date.toUpperCase();
      const itemB = sort === strings.filterType.abc ? b.subject.toUpperCase() : b.added_date.toUpperCase();
      if (itemA < itemB) {
        return -1;
      }
      if (itemA > itemB) {
        return 1;
      }
      return 0;
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

  _handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this._makeAPIRequest();
    });
  }

  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0, backgroundColor: 'transparent' }}>
            <FlatList
              data={
                this.state.filteredData.length === 0 ?
                this.state.data : this.state.filteredData
              }
              renderItem={({ item }) => (
                <TouchableOpacity onPress={this._handleClick.bind(this, item)}>
                  <ListItemIcon
                    title={`${item.subject}`}
                    subTitle={item.added_date}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.message_id}
              ListHeaderComponent={this._renderHeader}
              ListFooterComponent={this._renderFooter}
              refreshing={this.state.refreshing}
              onRefresh={this._handleRefresh}
            />
          </List>
          {this.state.data.length === 0 ?
            <Text style={styles.txt}>No messages</Text>
            :
            null
          }
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.session.accessToken
  };
};

export default connect(mapStateToProps, null)(InboxScreen);
