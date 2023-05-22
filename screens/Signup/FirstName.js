// FirstName.js
import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';
import { firstNameScreen, lastNameScreen } from '../../components/styles2';

import Navbar from '../../components/Navbar';

const FirstName = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handlePress = () => {
    navigation.navigate('EmailAndNumber', { firstName, lastName });
  };

  return (
    <View style={firstNameScreen.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Navbar
        navigation={navigation}
        showBackButton={true}
        showNextButton={true}
        onNext={handlePress}
      />

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