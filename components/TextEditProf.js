import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { settingsStyles, fightingStyleScreen } from './styles2'

const TextEditProf = ({ title, settingButton = false, showChevron = false, value, isHeightFeet, onWeightChange, onHeightChange, heightType }) => {  // Initialize a state variable with the value passed from the parent component
  const [inputValue, setInputValue] = useState(value ? value.toString() : '');

  const handleChange = (text) => {
    setInputValue(text);
    if (onWeightChange) {
      onWeightChange(text);
    }
    if (onHeightChange) {
      onHeightChange(text, heightType);
    }
  };

  useEffect(() => {
    if (value) {
      setInputValue(value.toString());
    }
  }, [value]);

  return (
    <View style={settingsStyles.sectionContainer}>
      {!settingButton ? <Text style={settingsStyles.sectionTitle}>{title}</Text> : null}

      <View style={isHeightFeet ? settingsStyles.sectionHeightRec : settingsStyles.sectionRectangle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "95%" }}>
        <TextInput
        style={[settingsStyles.preferenceText, { flex: 1 }]}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={handleChange} // Call handleChange when the text input changes
      />

          {showChevron && (
            <Icon name="chevron-right" size={15} style={{ color: "white" }} />
          )}
        </View>
      </View>
    </View>
  );
};
export default TextEditProf;