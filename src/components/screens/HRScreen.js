import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { List } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import ComplianceItem from '../ComplianceItem';
import SearchBar from '../SearchBar';
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
  },
});

class HRScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      message: 'Loading...',
      refreshing: false,
      filteredData: [],
      term: '',
      sort: '',
    };
  }

  componentDidMount = () => {
    this._makeAPIRequest();
  }

  _makeAPIRequest = () => {
    console.log('this was hit');
    this.setState({ loading: true });
    const date = '0';
    axios.get(userAPI.compliance.pdfData, {
      params: {
        access_token: this.props.token,
        date
      }
    })
      .then((res) => (
        res.data.data === 'empty'
        ?
        this.setState({ message: res.data.response.message, loading: false, refreshing: false })
        :
        this.setState({ data: res.data.response, loading: false, refreshing: false })
      ))
      .catch((err) => console.log(err));
  }

  _handleSearch(text) {
    const newData = this.state.data.filter(item => {
      const itemData = item.file_name.toUpperCase();
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
      const itemA = sort === 'abc' ? a.file_name.toUpperCase() : a.generated_datetime.toUpperCase();
      const itemB = sort === 'abc' ? b.file_name.toUpperCase() : b.generated_datetime.toUpperCase();
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

  _handleClick(item) {
    this.props.navigation.navigate('ViewCompliance', { message: item, refresh: this._makeAPIRequest });
  }

  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <SearchBar
            handleSearch={this._handleSearch.bind(this)}
            sortBy={this._handleSort.bind(this)}
            noDate
          />
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0, backgroundColor: 'transparent' }}>
            <FlatList
              data={
                this.state.filteredData.length === 0 ?
                this.state.data : this.state.filteredData
              }
              renderItem={({ item }) => (
                <TouchableOpacity onPress={this._handleClick.bind(this, item)}>
                <ComplianceItem
                  title={item.file_name}
                  path={item.file_path}
                  compliance_id={item.compliance_id}
                  viewed={item.viewed}
                />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.compliance_id}
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
    token: state.session.accessToken
  };
};

export default connect(mapStateToProps, null)(HRScreen);
