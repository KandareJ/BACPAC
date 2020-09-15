import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, Button as PlainButton, Alert } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
const Buffer = require('buffer/').Buffer

import TopBar from '../TopBar';
import Button from './Button';
import { styles } from './styles';
import { toRelativeTime } from './time';
import { receiveData, s3 } from '../../logic/HttpProxy';
import { read, write, deleteFile } from '../../logic/FileSystemProxy';

class ConnectedState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battery: 82,
      storage: 43,
      lastSync: -1
    }

    this.readStorage = this.readStorage.bind(this);
    this.sync = this.sync.bind(this);

    this.readStorage();
  }

  componentDidMount() {
    this.interval = setInterval(() => {this.setState({battery: this.state.battery})}, 60000);
  }

  readStorage() {
    AsyncStorage.getItem(`lastSync`).then((value) => {
      if (value !== null) this.setState({lastSync: JSON.parse(value)});
    })
  }

  sync(callback) {
    this.props.BLE.syncData(this.props.device.uuid, (error, data) => {
      if (error) {
        console.log(error);
        let time = Date.now();
        AsyncStorage.setItem(`lastSync`, JSON.stringify(time)).then(() => {
          this.setState({lastSync: time});
          callback();
        });
        return;
      }
      let buf = new Buffer(data.value, 'base64');

      if (this.max === null || this.max === undefined || this.count === null || this.count === undefined) {
        this.max = buf.toJSON().data[0];
        this.count = 0;
        console.log("set max to " + this.max);
      }

      else if (this.count < this.max) {
        this.count++;
        console.log(buf.toJSON().data[0], this.count);
      }

      else {
        console.log(buf.toJSON().data[0], this.count);
        this.count = null;
        this.max = null;
        callback();
        this.props.BLE.endSync();
      }
    });
    /*receiveData( (resp) => {
      write(JSON.stringify(resp.data), () => {
        let time = Date.now();
        AsyncStorage.setItem(`lastSync`, JSON.stringify(time)).then(() => {
          this.setState({lastSync: time});
          callback();
        });
      });
    });*/
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
          <Image style={styles.image} source={require('../../../assets/img/BackHarnessWoman.png')} />
          <View style={styles.textView}>
            <Text style={styles.text}>{this.props.device.name}</Text>
            <Text style={styles.text}>Battery:<Text style={styles.textNotBold}> {this.state.battery || '-'}%</Text></Text>
            <Text style={styles.text}>Storage:<Text style={styles.textNotBold}> {this.state.storage}%</Text></Text>
            <Text style={styles.text}>Last Sync:<Text style={styles.textNotBold}> {toRelativeTime(this.state.lastSync, Date.now())}</Text></Text>
          </View>
          <Button push={this.push} sync={this.sync} pos={this.state.lastPush >= this.state.lastSync} />
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
