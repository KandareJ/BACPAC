import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { styles } from './styles';

export default class Result extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigation.navigate('Results');
  }

  render() {
    return(
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.props.timestamp}</Text>
          <Text style={styles.open}>></Text>
        </View>
      </TouchableOpacity>
    );
  }
}
