import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const BioInput = ({ bio }) => {
    const [value, setValue] = useState('');
  const maxLength = 256;

  useEffect(() => {
    if (bio) {
      setValue(bio);
    }
  }, [bio]);

  const onChangeText = (text) => {
    setValue(text);
  };
  
    return (
      <View style={styles.sectionContainer}>
        <TextInput
          editable
          multiline
          maxLength={maxLength}
          onChangeText={onChangeText}
          value={value}
          style={styles.textInput}
        />
        <Text style={styles.characterCounter}>{maxLength - value.length} characters remaining</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#fff',
        borderColor: '#000000',
        borderWidth: 1,
        padding: 10,
        position: 'relative', // To position the character counter absolutely
    },
    textInput: {
        minHeight: 100, // You can set the height as per your requirement
        padding: 10,
        textAlignVertical: 'top', // Aligns text to the top on Android
    },
    characterCounter: {
        position: 'absolute', // Positioning the counter absolutely
        bottom: 10,
        right: 10,
        fontSize: 12,
        color: '#888',
    },
});

export default BioInput;
