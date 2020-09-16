import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import TopBar from '../../../SharedComponents/TopBar';
import { styles } from './styles';

class Profile extends Component {
  back = () => {
    this.props.navigation.popToTop();
  }

  render() {
    return (
      <TopBar title={'Profile'} back={this.back}>
        <View style={styles.bg}>
          <Text style={styles.text}><Text style={styles.label}>Name:</Text> John Smith</Text>
          <Text style={styles.text}><Text style={styles.label}>Age:</Text> 41</Text>
          <Text style={styles.text}><Text style={styles.label}>Device Name:</Text> {this.props.device.name}</Text>
          <Text style={styles.text}><Text style={styles.label}>BACPAC UUID:</Text> {this.props.device.uuid}</Text>
          <Text style={styles.text}><Text style={styles.label}>Battery:</Text> 84%</Text>
          <Text style={styles.text}><Text style={styles.label}>Storage:</Text> 23%</Text>
        </View>
      </TopBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    device: state.addedDevice
  };
}

export default connect(mapStateToProps)(Profile);
