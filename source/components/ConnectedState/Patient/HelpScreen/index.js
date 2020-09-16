import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import TopBar from '../../../SharedComponents/TopBar';
import Button from '../../../SharedComponents/Button';
import { styles } from './styles';
import { sync, push, battery, storage, issue } from './helpText';
import { removeDevice } from '../../../../actions';

class HelpScreen extends Component {
  render () {
    return (
      <TopBar title={"Help"} onMenuPress={this.props.navigation.toggleDrawer}>
          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.boldText}>Current Device: <Text style={styles.text}>{this.props.device.name}</Text></Text>
              <Text style={styles.boldText}>Device UUID: <Text style={styles.text}>{this.props.device.uuid}</Text></Text>
              <Text style={styles.boldText}>Sync: <Text style={styles.text}>{sync}</Text></Text>
              <Text style={styles.boldText}>Push: <Text style={styles.text}>{push}</Text></Text>
              <Text style={styles.boldText}>Battery: <Text style={styles.text}>{battery}</Text></Text>
              <Text style={styles.boldText}>Storage: <Text style={styles.text}>{storage}</Text></Text>
              <Text style={styles.boldText}>Issues: <Text style={styles.text}>{issue}</Text></Text>
            </View>
          </ScrollView>
      </TopBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    device: state.addedDevice
  };
}

export default connect(mapStateToProps, { removeDevice })(HelpScreen);
