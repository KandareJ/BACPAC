import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import TopBar from '../../../SharedComponents/TopBar';
import PatientName from './PatientName';
import { styles } from './styles';

const SelectPatient = () => {
  return (
    <TopBar title={'Select Patient'}>
      <ScrollView style={{backgroundColor: '#e3e3e3'}}>
        {patientInfo.map((x) => <PatientName patientInfo={x} key={x.first_name+x.last_name} />)}
        <View style={{alignItems: 'center'}}>
        <TouchableOpacity>
          <View style={styles.addIcon}>
            <Text style={styles.addIconText}>+</Text>
          </View>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </TopBar>
  );
};

export default SelectPatient;

const patientInfo = [
  { first_name: 'Jace', last_name: 'Kandare', sex: 'Male', age: 23 },
  { first_name: 'Cassie', last_name: 'Kandare', sex: 'Female', age: 20 }
];
