import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import HeaderSub from '../HeaderSub';
import ListItem from '../ListItem';
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
  { title: 'Filename.pdf', subTitle: '683 MB, modified yesterday 4:25 PM' },
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

class HRScreen extends Component {

  _renderItems = () => {
    return filler.map((item, i) => {
      return (
        <ListItem key={i} title={item.title} subTitle={item.subTitle} />
      );
    });
  }

  render() {
    return (
      <LinearGradient colors={[colors.darkBlueTwo, colors.blue]} style={styles.container}>
        <View style={styles.inner}>
          <ScrollView>
            {this._renderItems()}
          </ScrollView>
        </View>
        <StatusBar hidden />
      </LinearGradient>
    );
  }
}

export default connect(null, null)(HRScreen);
