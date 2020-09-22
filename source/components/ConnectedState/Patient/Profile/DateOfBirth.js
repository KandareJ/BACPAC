import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';

const DateOfBirth = ({dob, set, visible, toggle}) => {
  return (
    <View style={styles.profileItem}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>Date of Birth:</Text>
        <TouchableWithoutFeedback onPress={toggle}>
          <View style={styles.sliderText}>
            <Text style={{fontSize: 22}}>{dob.toLocaleDateString()}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      { visible && <DateTimePicker value={dob} mode={'date'} display="spinner" onChange={(event, time)=> { set(time) }} minimumDate={new Date(1900, 0, 1)} maximumDate={new Date()} /> }
    </View>
  );
}

export default DateOfBirth;
