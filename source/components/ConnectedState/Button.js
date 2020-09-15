import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { styles } from './styles';

export default class Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buttonPress: false,
      syncing: false
    };

    this.buttonStyle = this.buttonStyle.bind(this);
    this.onButtonStateChange = this.onButtonStateChange.bind(this);
    this.finishSyncing = this.finishSyncing.bind(this);
    this.renderButtonText = this.renderButtonText.bind(this);
  }

  onButtonStateChange({nativeEvent}) {
    if (!this.state.syncing) {
      if (nativeEvent.state === State.BEGAN) {
        this.setState({isPressed: true});
      }
      else if (nativeEvent.state === State.ACTIVE) {
        this.setState({isPressed: false, syncing: true});
        this.props.sync(this.finishSyncing);
      }
    }
  }

  buttonStyle() {
    if (this.state.isPressed) return styles.buttonPress;
    else return styles.button;
  }

  finishSyncing() {
    this.setState({ syncing: false });
  }

  renderButtonText() {
    if (this.state.syncing) {
      return (
        <Animated.View style={this.buttonStyle()}>
          <Image style={styles.pulse} source={require('../../../assets/img/SpinnerLoading.gif')} />
          <Text style={styles.buttonText}>Syncing</Text>
        </Animated.View>
      );
    }
    else {
      return (
        <Animated.View style={this.buttonStyle()}>
          <Text style={styles.buttonText}>Sync</Text>
        </Animated.View>
      );
    }
  }

  render() {
    return(
      <TapGestureHandler onHandlerStateChange={this.onButtonStateChange}>
        {this.renderButtonText()}
      </TapGestureHandler>
    );
  }
}
