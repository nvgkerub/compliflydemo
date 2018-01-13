import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { List } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../SearchBar';
import NoteItem from '../NoteItem';
import AddNoteButton from '../AddNoteButton';
import * as colors from '../../constants/colors';
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
  emptyTxt: {
    marginTop: 10,
    color: colors.white,
    fontSize: textStyle.fontSize.light,
    textAlign: 'center',
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
    this.props.navigation.setParams({ refresh: this._makeAPIRequest });
  }

  _makeAPIRequest = () => {
    this.setState({ loading: true });
    this._grabData();
  }

  async _grabData() {
    console.log('reached');
    const data = await AsyncStorage.getItem('noteList');
    if (data !== null) {
      this.setState({ data: JSON.parse(data), loading: false, refreshing: false, });
    } else {
      this.setState({ loading: false, refreshing: false, });
    }
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
      const itemA = sort === strings.filterType.abc ? a.title.toUpperCase() : a.generated_datetime.toUpperCase();
      const itemB = sort === strings.filterType.abc ? b.title.toUpperCase() : b.generated_datetime.toUpperCase();
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
        noDate
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

  _viewNote(item) {
    this.props.navigation.navigate(routeNames.notes.view, {
      note: item,
      refresh: this._makeAPIRequest,
    });
  }

  render() {
    return (
      <LinearGradient colors={[colors.blueDark, colors.blueLight]} style={styles.container}>
        <View style={styles.inner}>
          {
            this.state.data.length === 0
            ?
            <Text style={styles.emptyTxt}>No Data</Text>
            :
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0, backgroundColor: 'transparent' }}>
              <FlatList
                data={
                  this.state.filteredData.length === 0 ?
                  this.state.data : this.state.filteredData
                }
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={this._viewNote.bind(this, item)}>
                    <NoteItem
                      title={item.title}
                      subTitle={item.subTitle}
                      navigations={this.props.navigation}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.note_id}
                ListHeaderComponent={this._renderHeader}
                ListFooterComponent={this._renderFooter}
                refreshing={this.state.refreshing}
                onRefresh={this._handleRefresh}
              />
            </List>
          }
        </View>
      </LinearGradient>
    );
  }
}

export default connect(null, null)(NotesScreen);
