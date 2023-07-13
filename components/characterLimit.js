import React from 'react';
import { Text } from 'react-native';

const CharacterLimitedText = ({ text, characterLimit }) => {
  let limitedText = text;
  if (limitedText.length > characterLimit) {
    limitedText = limitedText.substring(0, characterLimit) + '...';
  }

  return <Text>{limitedText}</Text>;
};

export default CharacterLimitedText;