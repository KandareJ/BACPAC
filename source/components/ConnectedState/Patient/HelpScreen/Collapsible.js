import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

const Collapsible = (props) => {
  const onPress = () => {
    if (props.selected) props.select('');
    else props.select(props.title);
  };

  return (
    <View style={styles.section}>
      <TouchableOpacity activeOpacity={.9} onPress={onPress}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>{props.title}</Text>
        </View>
        {props.selected && <View style={styles.collapsibleContent}>
          <Text style={styles.collapsibleText}>{props.content}</Text>
        </View>}
      </TouchableOpacity>
    </View>
  );
};

export default Collapsible;
