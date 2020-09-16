import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

import TopBar from '../TopBar';
import Button from '../Button';
import RadioButtons from './RadioButtons';
import { styles } from './styles';

class Profile extends Component {
  state = {
    selected: '',
    name: '',
    age: '',
    changed: false
  }

  back = () => {
    this.props.navigation.popToTop();
  }

  render() {
    return (
      <TopBar title={'Profile'} onMenuPress={this.props.navigation.toggleDrawer}>
        <View style={styles.bg}>

          <View style={styles.profileItem}>
            <View style={{flex: 1}}><Text style={{...styles.label, ...styles.text}}>Name:</Text></View>
            <View style={{flex: 3}}>
              <TextInput style={styles.text} value={this.state.name} onChangeText={(text) => {this.setState({name: text, changed: true})}}/>
            </View>
          </View>

          <View style={styles.profileItem}>
            <View style={{flex: 1}}><Text style={{...styles.label, ...styles.text}}>Age:</Text></View>
            <View style={{flex: 3}}>
              <TextInput style={styles.text} keyboardType={'numeric'} value={this.state.age} onChangeText={(text) => {this.setState({age: text, changed: true})}}/>
            </View>
          </View>

          <View style={{...styles.profileItem, flexDirection: 'column'}}>
            <Text style={{...styles.label, ...styles.text}}>Gender:</Text>
            <RadioButtons options={['Male', 'Female', 'Prefer not to answer']} selected={this.state.selected} select={(selected) => { this.setState({selected, changed: true}) }} />
          </View>

          <View style={{alignItems: 'center'}}>
            <Button text='Update' onPress={()=> {console.log("push")}} disabled={!this.state.changed} />
          </View>

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
