import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Device from './Device';
import { styles } from './styles';

class DeviceList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.deviceFound = this.deviceFound.bind(this);
  }

  componentDidMount() {
    if (this.props.BLE) this.props.BLE.scan(this.deviceFound);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.BLE !== this.props.BLE) {
      this.props.BLE.scan(this.deviceFound);
    }
  }

  deviceFound(error, device) {
    if (error) console.log(error);
    else if (!(device.id in this.state) && device.name) {
      console.log(device.id, device.name);
      this.setState({...this.state, [device.id]: device});
    }
  }

  listDevices() {
    return Object.keys(this.state).map((key) => {
      return (<Device device={this.state[key]} key={key} />);
    })
  }

  render() {
    return (
      <View>
        <ScrollView style={styles.scrollListStyle}>
          {this.listDevices()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    BLE: state.BLE
  };
}

export default connect(mapStateToProps)(DeviceList);
