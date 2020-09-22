import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';

import TopBar from '../../../SharedComponents/TopBar';
import Button from '../../../SharedComponents/Button';
import RadioButtons from './RadioButtons';
import DateOfBirth from './DateOfBirth';
import { styles } from './styles';
import { saveProfile, getProfile } from '../../../../logic/logicFacade';

class Profile extends Component {
  state = {
    gender: '',
    first_name: '',
    last_name: '',
    height: 68,
    weight: 185,
    changed: false,
    dob: new Date(),
    dateVisible: false
  }

  componentDidMount() {
    getProfile().then((resp) => {
      resp.dob = (resp.dob) ? new Date(resp.dob) : new Date();
      this.setState(resp);
    })
  }

  back = () => {
    this.props.navigation.popToTop();
  }

  updateProfile = () => {
    this.refs.profileScroll.scrollTo({y: 0});
    let profile = {
      gender: this.state.gender,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      height: this.state.height,
      weight: this.state.weight,
      dob: this.state.dob
    }
    saveProfile(profile).then(() => {
      this.setState({ changed: false, dateVisible: false });
    });
  }

  toggle = () => {
    this.setState({dateVisible: !this.state.dateVisible});
    setTimeout(() => { this.refs.profileScroll.scrollToEnd(); }, 50);
  }

  render() {
    return (
      <TopBar title={'Profile'} onMenuPress={this.props.navigation.toggleDrawer}>

        <View style={styles.bg}>

          <View style={styles.form}>
            <ScrollView ref='profileScroll'>
              <View style={{marginTop: 40}}>
                <View style={styles.profileItem}>
                  <Text style={styles.label}>First Name:</Text>
                  <TextInput style={styles.textInput} value={this.state.first_name} onChangeText={(text) => {this.setState({first_name: text, changed: true})}}/>
                </View>

                <View style={styles.profileItem}>
                  <Text style={styles.label}>Last Name:</Text>
                  <TextInput style={styles.textInput} value={this.state.last_name} onChangeText={(text) => {this.setState({last_name: text, changed: true})}}/>
                </View>

                <View style={{...styles.profileItem, flexDirection: 'column'}}>
                  <Text style={styles.label}>Height (ft):</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Slider style={{ height: 40, flex: 1}} minimumTrackTintColor='#46648c' minimumValue={36} maximumValue={84} value={this.state.height} onValueChange={(val) => {this.setState({height: val, changed: true})}} onSlidingComplete={(val) => {this.setState({height: val, changed: true})}} step={1} />
                    <View style={{...styles.sliderText, flex: 0, width: 77}}><Text style={{fontSize: 22}}>{Math.floor(this.state.height / 12)}' {this.state.height % 12}"</Text></View>
                  </View>
                </View>

                <View style={{...styles.profileItem, flexDirection: 'column'}}>
                  <Text style={styles.label}>Weight (lbs):</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Slider style={{ height: 40, flex: 1}} minimumTrackTintColor='#46648c' minimumValue={20} maximumValue={300} value={this.state.weight} onValueChange={(val) => {this.setState({weight: val, changed: true})}} step={1} />
                    <View style={{...styles.sliderText, flex: 0, width: 77}}><Text style={{fontSize: 22}}>{this.state.weight}</Text></View>
                  </View>
                </View>

                <View style={{...styles.profileItem, flexDirection: 'column'}}>
                  <Text style={styles.label}>Gender:</Text>
                  <RadioButtons options={['Male', 'Female', 'Other']} selected={this.state.gender} select={(gender) => { this.setState({gender, changed: true}) }} />
                </View>

                <DateOfBirth dob={this.state.dob} set={(dob) => {this.setState({dob, changed: true})}} toggle={this.toggle} visible={this.state.dateVisible} />
              </View>
            </ScrollView>
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
