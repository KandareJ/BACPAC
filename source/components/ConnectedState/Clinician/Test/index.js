import React, { Component } from 'react';
import { View, Image, TextInput, Alert } from 'react-native';

import TopBar from '../../../SharedComponents/TopBar';
import Button from '../../../SharedComponents/Button';
import { styles } from './styles';
import { testDescriptions } from '../Tests/testDescriptions';

export default class Test extends Component {
  constructor(props) {
    super(props);

    this.state = { started: false }

    this.back = this.back.bind(this);
    this.start = this.start.bind(this);
    this.finish = this.finish.bind(this);
    this.button = this.button.bind(this);
    this.test = this.props.route.params.test;

    props.navigation.addListener('focus', (e) => {
      console.log("stopped");
    });
  }

  back() {
    this.props.navigation.popToTop();
  }

  start() {
    this.setState({ started: true })
  }

  finish() {
    Alert.alert('Finish Exercise',
    '',
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Finish",
        onPress: () => {
          this.props.navigation.push('Results', { test: this.test });
        }
      }
    ]);
  }

  button() {
    if (this.state.started) return(<Button text={"Finish"} onPress={this.finish}/>);
    else return(<Button text={"Start"} onPress={this.start}/>);
  }

  render() {
    return (
      <TopBar title={this.test.title} back={this.back}>
        <View style={styles.bg}>
          <Image source={this.test.image} style={styles.image}/>
          <View style={styles.button}>
            {this.button()}
          </View>
        </View>
      </TopBar>
    );
  }
}
