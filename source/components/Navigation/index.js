import React, { Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import DisconnectedState from '../DisconnectedState';
import ConnectedState from '../ConnectedState';
import LoadingState from '../LoadingState';
import HelpScreen from '../HelpScreen';
import { removeDevice } from '../../actions';
import { styles } from './styles';

const Drawer = createDrawerNavigator();

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.drawerContent = this.drawerContent.bind(this);
  }

  drawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Disconnect" onPress={this.props.removeDevice} />
        <DrawerItem label="Report Issue" onPress={() => Linking.openURL(`mailto:support@BACPAC.org?subject=${this.props.device.uuid}`)} />
      </DrawerContentScrollView>
    );
  }

  render() {
    if (this.props.device === null) return (<DisconnectedState />);
    else if (this.props.connecting) return (<LoadingState />);
    else return (
      <NavigationContainer>
        <Drawer.Navigator drawerStyle={styles.drawer} drawerContent={this.drawerContent} drawerType="front" initialRouteName="BACPAC">
          <Drawer.Screen name="BACPAC" component={ConnectedState} />
          <Drawer.Screen name="Help" component={HelpScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    device: state.addedDevice,
    connecting: state.connecting
  };
}

export default connect(mapStateToProps, { removeDevice })(Navigation);
