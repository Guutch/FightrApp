import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';
import { firstNameScreen, lastNameScreen } from '../../components/styles2';

import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../../components/Navbar';
import NextButton from '../../components/NextButton';

const EmailAndNumber = ({ navigation, route }) => {
  const { firstName, lastName } = route.params;
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePress = () => {
    navigation.navigate('HeightAndWeight', { firstName, lastName, email, phoneNumber });
  };

  return (
    <View style={firstNameScreen.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Navbar navigation={navigation} />
      <Text style={firstNameScreen.questionText}>What's your email address?</Text>
      <TextInput
        style={firstNameScreen.rectangle}
        value={email}
        onChangeText={setEmail}
        placeholder="Email Address"
        placeholderTextColor="white"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={lastNameScreen.questionText}>What's your phone number?</Text>
      <TextInput
        style={lastNameScreen.rectangle}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        placeholderTextColor="white"
        keyboardType="phone-pad"
      />
      <NextButton onPress={handlePress} />
    </View>
  );
};

export default EmailAndNumber;
