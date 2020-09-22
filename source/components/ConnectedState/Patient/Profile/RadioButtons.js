import React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';

const RadioButtons = ({options, selected, select}) => {
  return (
    <View>
      {options.map((x) => {
        return (<Button key={x} title={x} selected={x === selected} select={select} />);
      })}
    </View>
  );
}

const Button = ({title, selected, select}) => {
  return(
    <TouchableWithoutFeedback onPress={() => {select(title)}}>
      <View style={styles.buttonContainer}>
        <View style={styles.radioButton}>
          {selected && <View style={styles.innerRadio}/> }
        </View>
        <View style={{ marginHorizontal: 10}}><Text style={styles.radioText}>{title}</Text></View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default RadioButtons;
