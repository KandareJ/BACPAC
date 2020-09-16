import React, { Component } from 'react';
import { View, Text, Button as PlainButton, Alert } from 'react-native';
import Video from 'react-native-video';

import TopBar from '../../../SharedComponents/TopBar';
import Button from '../../../SharedComponents/Button';
import { styles } from './styles';

export default class TestPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: false
    }

    this.continue = this.continue.bind(this);
    this.past = this.past.bind(this);
    this.back = this.back.bind(this);

    this.test = this.props.route.params.test;
  }

  continue() {
    Alert.alert(
      `${this.test.title}`,
      `I confirm that I understand how to do the ${this.test.title} exercise`,
      [
        {
          text: "Review",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: () => {
            this.setState({ paused: true });
            this.props.navigation.push('Test', { test: this.test });
          }
        }
      ]);
  }

  past() {
    this.props.navigation.push('PastResults', { test: this.test });
  }

  back() {
    this.props.navigation.pop();
  }

  render() {

    return (
      <TopBar title={`${this.test.title} - Preview`} back={this.back}>
        <View style={styles.bg}>
            <View style={styles.video}>
              <Video
                ref={(ref: Video) => { this.video = ref }}
                source={this.test.video}
                style={{flex: 1}}
                controls={true}
                paused={this.state.paused}
              />
            </View>
            <View style={styles.button}>
              <Button text={"Start Exercise"} onPress={this.continue}/>
            </View>
            <PlainButton titleStyle={styles.plainButton} title="Past Results" onPress={this.past}/>
          </View>
      </TopBar>
    );
  }
}
