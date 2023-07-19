// FirstName.js
import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar, Alert } from 'react-native';
import { firstNameScreen, lastNameScreen } from '../../components/styles2';

import Navbar from '../../components/Navbar';
import ProgressBar from '../../components/ProgressBar';

const FirstName = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handlePress = () => {
    if (!firstName || firstName.trim() === '') {
      Alert.alert('Validation error', 'First name cannot be empty.');
      return;
    }

    if (/\d/.test(firstName || lastName)) {
      Alert.alert('Validation error', 'Your name cannot contain digits.');
      return;
    }

    if (!lastName || lastName.trim() === '') {
      Alert.alert('Validation error', 'Last name cannot be empty.');
      return;
    }

    navigation.navigate('EmailAndNumber', { firstName, lastName });
  };

  return (
    <View style={firstNameScreen.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        navigation={navigation}
        showBackButton={true}
        showNextButton={true}
        onNext={handlePress}
      />
      <ProgressBar progress={1 / 8} />

      <Text style={firstNameScreen.questionText}>What's your first name?</Text>
      <TextInput
        style={firstNameScreen.rectangle}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
        placeholderTextColor="white"
      />
      <Text style={lastNameScreen.questionText}>What's your last name?</Text>
      <TextInput
        style={lastNameScreen.rectangle}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        placeholderTextColor="white"
      />
    </View>
  );
};

export default FirstName;