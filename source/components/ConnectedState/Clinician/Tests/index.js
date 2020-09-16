import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';

import TopBar from '../../../SharedComponents/TopBar';
import TestSelector from './TestSelector';
import { styles } from './styles';
import { testDescriptions } from './testDescriptions';



export default class Tests extends Component {
  renderTestSelectors() {
    return testDescriptions.map((t) => <TestSelector key={t.title} test={t} navigation={this.props.navigation} />);
  }

  ProfileButton = () => {
    return (
      <TouchableOpacity onPress={()=>{this.props.navigation.push('Profile');}}>
        <View>
          <Image source={require('../../../../../assets/icons/person.png')} style={{width: 30, height: 30}} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <TopBar title="Exercises" right={this.ProfileButton}>
        <View style={styles.bg}>
          <ScrollView style={styles.scroll}>
            {this.renderTestSelectors()}
          </ScrollView>
        </View>
      </TopBar>
    );
  }
}
