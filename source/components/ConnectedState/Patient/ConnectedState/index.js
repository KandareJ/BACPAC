import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, Button as PlainButton, Alert } from 'react-native';
import { connect } from 'react-redux';

import TopBar from '../../../SharedComponents/TopBar';
import Button from './Button';
import { styles } from './styles';
import { toRelativeTime } from './time';
import { getLastSyncTime, Synchronizer } from '../../../../logic/logicFacade';

class ConnectedState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battery: 82,
      storage: 43,
      lastSync: -1
    }

    this.Synchronizer = new Synchronizer(props.BLE, props.device.uuid);

    getLastSyncTime().then((resp) => {
      this.setState({ lastSync: resp });
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => {this.setState({battery: this.state.battery})}, 60000);
  }

  sync = (callback) => {
    this.Synchronizer.sync((lastSync) => {
      this.setState({ lastSync });
      callback();
    })
  }

  finish = () => {
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
          console.log("finished");
        }
      }
    ]);
  }

  render() {
    return (
      <TopBar title={"BACPAC"} onMenuPress={this.props.navigation.toggleDrawer}>
        <View style={styles.bgView}>
          <Image style={styles.image} source={require('../../../../../assets/img/BackHarnessWoman.png')} />
          <View style={styles.textView}>
            <Text style={styles.text}>{this.props.device.name}</Text>
            <Text style={styles.text}>Battery:<Text style={styles.textNotBold}> {this.state.battery || '-'}%</Text></Text>
            <Text style={styles.text}>Storage:<Text style={styles.textNotBold}> {this.state.storage}%</Text></Text>
            <Text style={styles.text}>Last Sync:<Text style={styles.textNotBold}> {toRelativeTime(this.state.lastSync, Date.now())}</Text></Text>
          </View>
          <Button sync={this.sync} />
          <View style={styles.plainButton}><PlainButton color='rgb(70,100,140)' title="Finish" onPress={this.finish}/></View>
        </View>
      </TopBar>
	  );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

const mapStateToProps = (state) => {
  return {
    device: state.addedDevice,
    BLE: state.BLE
  };
}

export default connect(mapStateToProps)(ConnectedState);
