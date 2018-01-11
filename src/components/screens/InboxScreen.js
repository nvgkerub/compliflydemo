import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import lodash from 'lodash';
import SearchBar from '../SearchBar';
import ListItemIcon from '../ListItemIcon';
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

class InboxScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { data: null, searchTerm: '', message: null };
  }

  componentWillMount = () => {
    axios.get(userAPI.message.retrieveInbox, {
      params: {
        access_token: this.props.token,
        date: 0
      }
    })
      .then((res) => (
        Array.isArray(res.data.response)
        ?
        this.setState({ data: res.data.response })
        :
        this.setState({ message: res.data.response.message })
      ))
      .catch((err) => console.log('library err', err));
  }

  _handleClick = (message) => {
    this.props.navigation.navigate('ViewMessage', { message });
  }

  _renderItems = () => {
    if (this.state.data === null) {
      if (this.state.message != null) {
        return (
          <Text>{this.state.message}</Text>
        );
      }
      return (
        <View>
          <Text>Loading...</Text>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      );
    }
    // if (this.state.searchTerm !== '') {
    //   const searched = lodash.filter(this.state.data, { title: this.state.searchTerm });
    //   return searched.map((item, i) => {
    //     return (
    //       <ListItemIcon
    //         key={i}
    //         title={item.subject}
    //         subTitle={item.added_date}
    //         navigations={this.props.navigation}
    //       />
    //     );
    //   });
    // }

    return this.state.data.map((item, i) => {
      return (
        <TouchableOpacity key={i} onPress={this._handleClick.bind(this, item)}>
          <ListItemIcon title={item.subject} subTitle={item.added_date} />
        </TouchableOpacity>
      );
    });
  }

  _handleSearch = (text) => {
    this.setState({ searchTerm: text });
  }
//TODO: add searchbar inside of inner above scrollview
// <SearchBar handleSearch={this._handleSearch} />
  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          <ScrollView>
            {this._renderItems()}
          </ScrollView>
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
