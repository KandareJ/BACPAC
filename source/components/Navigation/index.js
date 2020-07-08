import React, { Component } from 'react';
import { Linking, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import DisconnectedState from '../DisconnectedState';
import ConnectedState from '../ConnectedState';
import LoadingState from '../LoadingState';
import HelpScreen from '../HelpScreen';
import { removeDevice, createBLEProxy } from '../../actions';
import { report, disconnect, help, home } from './icon';
import { styles, drawerOptions } from './styles';
import PastResults from '../PastResults';

const Drawer = createDrawerNavigator();

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.drawerContent = this.drawerContent.bind(this);
    this.props.createBLEProxy();
  }

  icon(icon, size) {
    return (<Image style={{...styles.icon, width: size, height: size}} source={icon} />);
  }

  drawerContent(props) {
    return (
      <View style={styles.drawerContents}>
        <DrawerContentScrollView {...props}>
          <Text style={styles.drawerTitle}>{this.props.device.name}</Text>
          <View style={styles.section} >
            <Text style={styles.sectionTitle}>Screens</Text>
            <View style={styles.sectionBody}>
              <DrawerItem icon={({size}) => this.icon(home, size)} label="BACPAC" onPress={() => {props.navigation.navigate('BACPAC')}} />
              <DrawerItem icon={({size}) => this.icon(help, size)} label="Help" onPress={() => {props.navigation.navigate('Help')}} />
            </View>
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionTitle}>Other</Text>
            <View style={styles.sectionBody}>
              <DrawerItem icon={({size}) => this.icon(report, size)} label="Report Issue" onPress={() => Linking.openURL(`mailto:support@BACPAC.org?subject=${this.props.device.uuid}`)} />
              <DrawerItem icon={({size}) => this.icon(disconnect, size)} label="Disconnect" onPress={this.props.removeDevice} />
            </View>
          </View>
        </DrawerContentScrollView>
      </View>
    );
  }

  render() {
    if (this.props.device === null) return /*<DisconnectedState />*/(<PastResults />);
    else if (this.props.connecting) return (<LoadingState />);
    else return (
      <NavigationContainer>
        <Drawer.Navigator drawerStyle={styles.drawer} drawerContent={this.drawerContent} drawerType={drawerOptions.drawerType} initialRouteName={drawerOptions.initialRouteName} >
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

export default connect(mapStateToProps, { removeDevice, createBLEProxy })(Navigation);
