import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../constants/colors';
import * as strings from '../constants/strings';
import * as textStyle from '../constants/textStyle';
import * as iconStyle from '../constants/iconStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blueFlat,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 7,
    paddingBottom: 7,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.blueGray,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
  },
  icon: iconStyle.searchBar,
  input: {
    color: colors.white,
    fontSize: textStyle.fontSize.input,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  sortContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    backgroundColor: colors.teal,
    height: 25,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTxt: {
    color: colors.white,
  }
});

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = { sortOpen: false, }
  }

  _handleChange = (text) => {
    this.props.handleSearch(text);
  }

  _openSort() {
    if (!this.state.sortOpen) {
      this.setState({ sortOpen: true });
    } else {
      this.setState({ sortOpen: false });
    }
  }

  _sortByAbc() {
    this.props.sortBy(strings.filterType.abc);
  }

  _sortByDate() {
    this.props.sortBy(strings.filterType.date);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.search}>
            <Image style={styles.icon} source={require('../images/search.png')} />
            <TextInput
              style={styles.input}
              placeholder="Search" onChangeText={(text) => this._handleChange(text)}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity onPress={this._openSort.bind(this)}>
            <Image style={styles.icon} source={require('../images/sort2x.png')} />
          </TouchableOpacity>
        </View>
        {this.state.sortOpen ?
          <View style={styles.sortContainer}>
            <TouchableOpacity style={styles.button} onPress={this._sortByAbc.bind(this, 'abc')}>
              <Text style={styles.buttonTxt}>Alphabetical</Text>
            </TouchableOpacity>
            {
              !this.props.noDate || this.props.noDate === null
              ?
                <TouchableOpacity
                  style={styles.button}
                  onPress={this._sortByDate.bind(this, 'date')}
                >
                  <Text style={styles.buttonTxt}>Date</Text>
                </TouchableOpacity>
              :
              null
            }
          </View>
          :
          null
        }
      </View>
    );
  }
}

export default connect(null, null)(SearchBar);
