import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from './styles';

const HelpCard = ({cardInfo}) => {
  return (
    <View style={styles.card}>
      <Image source={cardInfo.icon} style={styles.image} />
      <Text style={styles.title}>{cardInfo.title}</Text>
      <Text style={styles.text}>{cardInfo.content}</Text>
    </View>
  );
};

export default HelpCard;
