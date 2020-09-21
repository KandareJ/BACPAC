import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';

import TopBar from '../../../SharedComponents/TopBar';
import Button from '../../../SharedComponents/Button';
import RadioButtons from './RadioButtons';
import { styles } from './styles';
import { saveProfile, getProfile } from '../../../../logic/logicFacade';

class Profile extends Component {
  state = {
    gender: '',
    name: '',
    age: '',
    height: 68,
    weight: 185,
    changed: false
  }

  componentDidMount() {
    getProfile().then((resp) => {
      this.setState(resp);
    })
  }

  back = () => {
    this.props.navigation.popToTop();
  }

  updateProfile = () => {
    let profile = {
      gender: this.state.gender,
      name: this.state.name,
      age: this.state.age,
    }
    saveProfile(profile).then(() => {
      this.setState({ changed: false });
    });
  }

  render() {
    return (
      <TopBar title={'Profile'} onMenuPress={this.props.navigation.toggleDrawer}>
        <View style={styles.bg}>

          <View style={styles.form}>
            <View style={styles.profileItem}>
              <Text style={styles.label}>Name:</Text>
              <TextInput style={styles.textInput} value={this.state.name} onChangeText={(text) => {this.setState({name: text, changed: true})}}/>
            </View>

            <View style={styles.profileItem}>
              <Text style={styles.label}>Age:</Text>
              <TextInput style={styles.textInput} keyboardType={'numeric'} value={this.state.age} onChangeText={(text) => {this.setState({age: text, changed: true})}}/>
            </View>

            <View style={{...styles.profileItem, flexDirection: 'column'}}>
              <Text style={styles.label}>Height:</Text>
              <View style={{flexDirection: 'row'}}>
                <Slider style={{ height: 40, flex: 1}} minimumValue={36} maximumValue={84} value={this.state.height} onValueChange={(val) => {this.setState({height: val, changed: true})}} step={1} />
                <Text style={{...styles.textInput, flex: 0, width: 77}}>{Math.floor(this.state.height / 12)}' {this.state.height % 12}"</Text>
              </View>
            </View>

            <View style={{...styles.profileItem, flexDirection: 'column'}}>
              <Text style={styles.label}>Weight: (lbs)</Text>
              <View style={{flexDirection: 'row'}}>
                <Slider style={{ height: 40, flex: 1}} minimumValue={20} maximumValue={300} value={this.state.weight} onValueChange={(val) => {this.setState({weight: val, changed: true})}} step={1} />
                <Text style={{...styles.textInput, flex: 0, width: 77}}>{this.state.weight}</Text>
              </View>
            </View>

            <View style={{...styles.profileItem, flexDirection: 'column'}}>
              <Text style={styles.label}>Gender:</Text>
              <RadioButtons options={['Male', 'Female', 'Other']} selected={this.state.gender} select={(gender) => { this.setState({gender, changed: true}) }} />
            </View>
          </View>

          <View style={{alignItems: 'center', marginBottom: 50}}>
            <Button text='Update' onPress={this.updateProfile} disabled={!this.state.changed} />
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
