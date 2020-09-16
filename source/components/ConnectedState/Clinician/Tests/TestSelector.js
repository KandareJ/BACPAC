import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { imageList } from '../../../../utils/config';
import { styles } from './styles';

export default class TestSelector extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigation.push('TestPreview', { test: this.props.test });
  }

  generateItem() {
    if(this.props.test.time === '20 minutes ago') {
      return (
        <View style={{...styles.selector, shadowOpacity: .2}}>
          <View style={styles.selectorTextWrapper}>
            <Text style={{...styles.selectorText, color: 'gray'}}>{this.props.test.title}</Text>
            <Text style={styles.selectorSubtext}>Last completed {this.props.test.time}</Text>
          </View>
          <View>
            <Image source={require('../../../../../assets/icons/done.png')} style={styles.icon}/>
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.selector}>
          <View style={styles.selectorTextWrapper}>
            <Text style={styles.selectorText}>{this.props.test.title}</Text>
            <Text style={styles.selectorSubtext}>Last completed {this.props.test.time}</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        {this.generateItem()}
      </TouchableOpacity>
    );
  }
}
