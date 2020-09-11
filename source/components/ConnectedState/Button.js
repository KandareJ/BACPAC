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
      syncing: false,
      pushing: false
    };

    this.buttonStyle = this.buttonStyle.bind(this);
    this.buttonText = this.buttonText.bind(this);
    this.onButtonStateChange = this.onButtonStateChange.bind(this);
    this.finishSyncing = this.finishSyncing.bind(this);
    this.finishPushing = this.finishPushing.bind(this);
    this.renderButtonText = this.renderButtonText.bind(this);
  }

  onButtonStateChange({nativeEvent}) {
    if (!this.state.syncing && !this.state.pushing) {
      if (nativeEvent.state === State.BEGAN) {
        this.setState({isPressed: true});
      }
      else if (nativeEvent.state === State.ACTIVE) {
        this.setState({isPressed: false});
        if (this.props.pos) {
          this.setState({ syncing: true });
          this.props.sync(this.finishSyncing);
        }
        else {
          this.setState({ pushing: true });
          this.props.push(this.finishPushing);
        }
      }
    }
  }

  buttonStyle() {
    if (this.state.isPressed) return styles.buttonPress;
    else return styles.button;
  }

  buttonText() {
    if (this.state.syncing || this.state.pushing) {
      if (this.props.pos) return "Syncing";
      else return "Pushing";
    }
    else {
        if (this.props.pos) return "Sync";
        else return "Push";
    }
  }

  finishSyncing() {
    this.setState({ syncing: false });
  }

  finishPushing() {
    this.setState({ pushing: false });
  }

  renderButtonText() {
    if (this.state.syncing || this.state.pushing) {
      return (
        <Animated.View style={this.buttonStyle()}>
          <Image style={styles.pulse} source={require('../../../assets/img/SpinnerLoading.gif')} />
          <Text style={styles.buttonText}>{this.buttonText()}</Text>
        </Animated.View>
      );
    }
    else {
      return (
        <Animated.View style={this.buttonStyle()}>
          <Text style={styles.buttonText}>{this.buttonText()}</Text>
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
