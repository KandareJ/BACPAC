import React, { Component } from 'react';
import Animated from 'react-native-reanimated';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { simulator } from '../../utils/config';

import { styles } from './styles';
import { finishConnecting } from '../../actions';
import TopBar from '../SharedComponents/TopBar';

class LoadingState extends Component {

  render() {
    if (simulator) setTimeout(this.props.finishConnecting, 2000);

    return(
      <TopBar title={"Connecting..."}>
        <View style={{flex: 1}}/>
          <View style={styles.bgView}>
            <Image style={styles.gif} source={require('../../../assets/img/loading3.gif')} />
          </View>
        <View style={{flex: 1}}/>
      </TopBar>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, { finishConnecting })(LoadingState);
