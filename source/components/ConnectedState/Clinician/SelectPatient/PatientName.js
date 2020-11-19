import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const PatientName = ({ patientInfo, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.name}>
      <Text style={styles.nameText}>{patientInfo.last_name}, {patientInfo.first_name}</Text>
      <Text style={styles.nameSubtext}>Sex: {patientInfo.sex}</Text>
      <Text style={styles.nameSubtext}>Age: {patientInfo.age}</Text>
    </View>
    </TouchableOpacity>
  );
};

export default PatientName;
