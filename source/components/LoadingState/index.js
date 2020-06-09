import React, { Component } from 'react';
import Animated from 'react-native-reanimated';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';

import { styles } from './styles';
import { finishConnecting } from '../../actions';
import TopBar from '../TopBar';

class LoadingState extends Component {

  render() {
    //setTimeout(this.props.finishConnecting, 2000);

    return(
      <View style={styles.bgView}>
        <TopBar />
        <Image style={styles.gif} source={require('../../../assets/img/loading3.gif')} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, { finishConnecting })(LoadingState);
