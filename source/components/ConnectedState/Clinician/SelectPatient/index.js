import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import TopBar from '../../../SharedComponents/TopBar';
import PatientName from './PatientName';
import { getPatients, savePatients } from '../../../../logic/DatabaseProxy';
import { styles } from './styles';

const SelectPatient = ({ navigation }) => {
  let [patientInfo, setPatientInfo] = React.useState([]);
  React.useEffect(() => {
    getPatients().then((resp) => {setPatientInfo(resp)})
  }, [patientInfo]);

  return (
    <TopBar title={'Select Patient'}>
      <ScrollView style={{backgroundColor: '#e3e3e3'}}>
        {patientInfo.map((x) => <PatientName patientInfo={x} onPress={()=>{navigation.push('Tests')}} key={x.first_name+x.last_name} />)}
        <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.push('Profile')}>
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
