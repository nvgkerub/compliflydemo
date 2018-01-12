import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import * as colors from '../../constants/colors';
import * as userAPI from '../../lib/api/userAPI';
import * as strings from '../../constants/strings';
import SearchBar from '../SearchBar';
import NotificationItem from '../NotificationItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  buttonContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  loadingBox: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

class NotificationScreen extends Component {

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
    axios.get(userAPI.notifications.grabNotifications, { params: {
        access_token: this.props.token,
        date: 0,
      }
    })
    .then(res => this.setState({ data: res.data.response, loading: false, refreshing: false }))
    .catch(err =>
      this.setState({
        error: 'Error while loading notification list',
        loading: false,
        refreshing: false,
      }));
  }

  _handleSearch(text) {
    const newData = this.state.data.filter(item => {
      const itemData = item.description.toUpperCase();
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
      const itemA = sort === strings.filterType.abc ? a.description.toUpperCase() : a.generated_datetime.toUpperCase();
      const itemB = sort === strings.filterType.abc ? b.description.toUpperCase() : b.generated_datetime.toUpperCase();
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
      this._sortData(sort, d, arr);
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
    //TODO: if there is different pages change state here
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
                <NotificationItem
                  title={`${item.description}`}
                  subtitle={item.generated_datetime}
                />
              )}
              keyExtractor={item => item.notification_id}
              ListHeaderComponent={this._renderHeader}
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

const mapStateToProps = (state) => {
  return {
    token: state.session.accessToken,
  };
};

export default connect(mapStateToProps, null)(NotificationScreen);
