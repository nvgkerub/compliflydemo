import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  WebView,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import ButtonColored from '../ButtonColored';
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
    // padding: 15,
  },
  textContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bold: {
    fontWeight: '600',
    color: colors.white,
  },
  light: {
    fontWeight: '300',
    marginLeft: 10,
    color: colors.white,
  },
  message: {
    height: 300,
    marginTop: 20,
  },
  buttonContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  webview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 30,
  }
});

class ViewLibraryFile extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'View File',
  });

  constructor(props) {
    super(props);
    this.state = { data: null, loading: true };
  }

  componentWillMount = () => {
    console.log(this.props);
    axios.get(userAPI.library.libraryDetial, {
      params: {
        access_token: this.props.token,
        library_id: this.props.navigation.state.params.file.library_id
      }
    })
      .then(res => this.setState({ data: res.data.response.librarydetail, loading: false }))
      .catch(err => console.log(err));
  }

  componentDidMount = () => {
    // adding function to right nav button
    // this.props.navigation.setParams({ handleDelete: this.handleDelete });
  }

  handleDelete = () => {
    console.log('delete pressed');
  }

  _handleClick() {
    // TODO: link button to allow users to download files
    console.log('download pressed');
    console.log('state', this.state);
    console.log('props', this.props);
  }

  _renderItems() {
    if (this.state.data != null) {
      return (
        <View>
          <WebView style={styles.webview} source={{ uri: this.state.data.file_path }} />
        </View>
      );
      // <View style={styles.textContainer}>
      // <Text style={styles.bold}>{strings.viewFile.addedBy}</Text>
      // <Text style={styles.light}>{ this.state.data.added_by }</Text>
      // </View>
      // <View style={styles.textContainer}>
      // <Text style={styles.bold}>{strings.viewFile.addedDate}</Text>
      // <Text style={styles.light}>{ this.state.data.added_date }</Text>
      // </View>
      // <View style={styles.textContainer}>
      // <Text style={styles.bold}>{strings.viewFile.title}</Text>
      // <Text style={styles.light}>{ this.state.data.title }</Text>
      // </View>
      // <View style={styles.buttonContainer}>
      // <ButtonColored
      // label={strings.viewFile.download}
      // clicked={this._handleClick.bind(this, this.state.data)}
      // />
      // </View>
    }
    return (
      <View>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
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

export default connect(mapStateToProps, null)(ViewLibraryFile);
