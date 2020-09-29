import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import TopBar from '../../../SharedComponents/TopBar';
import Button from '../../../SharedComponents/Button';
import HelpCard from './HelpCard';
import { styles } from './styles';
import { help } from './helpText';
import { removeDevice } from '../../../../actions';

class HelpScreen extends Component {
  state = {
    selected: ''
  }
  render () {
    return (
      <TopBar title={"Help"} onMenuPress={this.props.navigation.toggleDrawer}>
          <ScrollView style={styles.content}>
            <View style={styles.section}>
              {help.map((x, i) => <HelpCard key={i} cardInfo={x} />)}
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
