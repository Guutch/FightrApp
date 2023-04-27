import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { firstNameScreen, lastNameScreen, photosScreen } from './styles2';
import Icon from 'react-native-vector-icons/FontAwesome';

import Navbar from './Navbar';
import NextButton from './NextButton';

const FirstName = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <View style={firstNameScreen.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Navbar navigation={navigation} />
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
      <View style={photosScreen.buttonContainer}>
        {/* <TouchableOpacity
        style={photosScreen.nextButton}
        onPress={() => navigation.navigate('Birthday')}
      >
        <Text style={photosScreen.nextButtonText}>Next</Text>
        <Icon name="arrow-right" size={30} color="#000" />
      </TouchableOpacity> */}
        <NextButton
          onPress={() => navigation.navigate('EmailAndNumber')}
        />
      </View>
    </View>
  );
};

export default FirstName;


