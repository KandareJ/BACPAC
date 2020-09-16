import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import TopBar from '../../../SharedComponents/TopBar';
import Result from './Result';
import { styles } from './styles';

const dummyData = [
  "Feb 13, 2020 - 8:04 am",
  "Feb 1, 2020 - 7:46 am",
  "Jan 19, 2020 - 8:10 am",
  "Jan 8, 2020 - 8:45 am",
  "Jan 4, 2020 - 9:00 am",
  "Jan 1, 2020 - 8:00 am"
]

export default class PastResults extends Component {
  constructor(props) {
    super(props);
    this.renderResults = this.renderResults.bind(this);
    this.back = this.back.bind(this);
  }

  back() {
    this.props.navigation.pop();
  }

  renderResults() {
    return dummyData.map((result) => <Result key={result} timestamp={result} navigation={this.props.navigation} />)
  }

  render() {
    return (
      <TopBar title={"Past Results"} back={this.back}>
        <View style={styles.bg}>
          <ScrollView style={styles.scroll}>
            {this.renderResults()}
          </ScrollView>
        </View>
      </TopBar>
    );
  }
}
