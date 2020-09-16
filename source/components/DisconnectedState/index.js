import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Animated, { Value, event, block, cond, eq, set, interpolate, Extrapolate, Clock } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import { height, styles } from './styles.js';
import { runTiming } from './AnimationTiming';
import DeviceList from './DeviceList';

export default class DisconnectedState extends Component {
  constructor() {
    super();
    this.buttonOpacity = new Value(1);

    // amimations for button being pressed
    this.onButtonStateChange = event([
      {
        nativeEvent:({ state })=>block([
          cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0)))
        ])
      }
    ]);

    this.onCloseState = event([
      {
        nativeEvent:({ state })=>block([
          cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 0, 1)))
        ])
      }
    ]);

    this.bottomViewComponentsOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bottomViewComponentsZIndex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [300, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.componentsY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, height],
      extrapolate: Extrapolate.CLAMP
    });

    this.welcomeY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, height],
      extrapolate: Extrapolate.CLAMP
    });
  }

  render() {
    return(
      <View style={styles.bgView}>
        <Animated.View style={{...styles.absoluteFill, transform: [{translateY: this.bgY}] }}>
          <Image style={styles.bgImage} source={require('../../../assets/img/backpain.jpeg')} />
        </Animated.View>
        {/*}<Animated.View style={{...styles.welcome}}>
          <Text style={styles.welcomeText}>Welcome to BacPac</Text>
        </Animated.View>*/}
        <View style={styles.bottomView}>
          <TapGestureHandler onHandlerStateChange={this.onButtonStateChange}>
            <Animated.View style={{...styles.button, opacity: this.buttonOpacity, transform: [{translateY: this.buttonY}]}}>
                <Text style={styles.buttonText}>Connect to a Device</Text>
            </Animated.View>
          </TapGestureHandler>

          <Animated.View style={{...styles.bottomViewComponents, zIndex: this.bottomViewComponentsZIndex, opacity: this.bottomViewComponentsOpacity, transform: [{translateY: this.componentsY}]}}>
            <TapGestureHandler onHandlerStateChange={this.onCloseState} >
              <Animated.View style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </Animated.View>
            </TapGestureHandler>
            <View style={styles.bottomViewComponentsPadding}>
              {/* This is where anything can be added in that should appear when the screen scrolls up */}
              <DeviceList />
              {/* This is where anything can be added in that should appear when the screen scrolls up */}
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
};
