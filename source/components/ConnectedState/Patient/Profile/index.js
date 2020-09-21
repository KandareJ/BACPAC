import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
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
