import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';

import { styles } from './styles';

export default class Button extends Component {
  constructor (props) {
    super(props);

    this.state = {
      buttonPress: false
    };

    this.onDisconnectStateChange = this.onDisconnectStateChange.bind(this);
    this.buttonStyle = this.buttonStyle.bind(this);
  }

  onDisconnectStateChange ({nativeEvent}) {
    if (nativeEvent.state === State.BEGAN) {
      this.setState({isPressed: true});
    }
    else if (nativeEvent.state === State.ACTIVE) {
      this.setState({isPressed: false});
      if(this.props.onPress)this.props.onPress();
    }
  }

  buttonStyle() {
    if (this.props.disabled) return {...styles.button, backgroundColor: 'gray'}
    if (this.state.isPressed) return {...styles.button, ...styles.buttonPress};
    else return styles.button;
  }

  render () {
    if(this.props.disabled) {
      return(
        <View style={this.buttonStyle()}>
          <Text style={styles.buttonText}> {this.props.text}</Text>
        </View>
      );
    }
    else {
      return (
        <TapGestureHandler onHandlerStateChange={this.onDisconnectStateChange} >
          <View style={this.buttonStyle()}>
            <Text style={styles.buttonText}> {this.props.text}</Text>
          </View>
        </TapGestureHandler>
      );
    }

  }
}
