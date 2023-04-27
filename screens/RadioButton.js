import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { fightingStyleScreen } from './styles2';

const RadioButton = ({ isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={fightingStyleScreen.radioButton}
      onPress={onSelect}
    >
      {isSelected ? (
        <View style={fightingStyleScreen.radioButtonInner} />
      ) : null}
    </TouchableOpacity>
  );
};

export default RadioButton;
