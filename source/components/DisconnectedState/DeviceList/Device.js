import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';

import { selectDevice, removeDevice } from '../../../actions';
import { styles } from './styles';

class Device extends Component {
  constructor(props) {
    super(props);

    this.devicePress = this.devicePress.bind(this);
  }

  devicePress() {
    this.props.BLE.connect(this.props.device.id,
      () => {
        this.props.selectDevice(this.props.device.id, this.props.device.name);
      },
      (error) => {
        if (error) console.log("error", error);
        this.props.removeDevice();
        Alert.alert('Disconnected', 'Please reconnect to your BACPAC device', [{ text: 'Continue' }]);
      });
  }

  render() {
    return(
      <TouchableOpacity onPress={this.devicePress}>
        <View style={styles.device}>
          <Text style={styles.deviceName}>{this.props.device.name}</Text>
          <Text style={styles.deviceID}>{this.props.device.id}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    BLE: state.BLE
  };
}

export default connect(mapStateToProps, { selectDevice, removeDevice })(Device);
