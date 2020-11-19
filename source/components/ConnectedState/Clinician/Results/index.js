import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import TopBar from '../../../SharedComponents/TopBar';
import Button from '../../../SharedComponents/Button';
import { styles } from './styles';

const reasons = [
  'example reason 1 detected in this test',
  'example reason 2 detected in this test',
  'example reason 3 detected in this test',
  'example reason 4 detected in this test',
  'example reason 5 detected in this test',
  'example reason 6 detected in this test',
  'example reason 7 detected in this test',
  'example reason 8 detected in this test',
  'example reason 9 detected in this test',
  'example reason 10 detected in this test',
  'example reason 11 detected in this test',
  'example reason 12 detected in this test',
  'example reason 13 detected in this test',
]

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.done = this.done.bind(this);
  }

  back() {
    this.props.navigation.pop();
  }

  done() {
    this.props.navigation.popToTop();
    this.props.navigation.push('Tests');
  }

  generateList = () => {
    return reasons.map((x) => {
      return <Text style={styles.text} key={x}>- {x}</Text>
    })
  }

  render() {
    return(
      <TopBar title="Results" back={this.back}>
        <View style={styles.bg}>
          <Text style={styles.title}><Text style={styles.bold}>Diagnosis: </Text> Example</Text>

            <Text style={styles.text}>Symptoms:</Text>
            <ScrollView style={styles.scrollView}>
              <View style={styles.innerScroll}>
                {this.generateList()}
              </View>
            </ScrollView>
        </View>
        <View style={styles.done}>
          <Button text={"Done"} onPress={this.done} />
        </View>
      </TopBar>
    );
  }
}
