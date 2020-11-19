import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Tests from '../Tests';
import Test from '../Test';
import TestPreview from '../TestPreview';
import Results from '../Results';
import PastResults from '../PastResults';
import Profile from '../Profile';

import SelectPatient from '../SelectPatient';

const Stack = createStackNavigator();

export default class ClinicianConnectedState extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Patient" component={SelectPatient} />
        <Stack.Screen headerShown={false} name="Tests" component={Tests} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="TestPreview" component={TestPreview} />
        <Stack.Screen name="PastResults" component={PastResults} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    );
  }
};
