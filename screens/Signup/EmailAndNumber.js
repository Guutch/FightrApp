import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar, Alert } from 'react-native';
import { firstNameScreen, lastNameScreen } from '../../components/styles2';

import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../../components/Navbar';
import InfoComponent from '../../components/InfoComponent';
import ProgressBar from '../../components/ProgressBar';

const EmailAndNumber = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^[0-9\b]+$/;
    return re.test(phoneNumber);
  };

  const handlePress = () => {
    if (!email || !validateEmail(email)) {
      Alert.alert('Validation error', 'Please enter a valid email address.');
      return;
    }

    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      Alert.alert('Validation error', 'Please enter a valid phone number.');
      return;
    }

    navigation.navigate('SignUpPassword', { ...route.params, email, phoneNumber });
  };

  return (
    <View style={firstNameScreen.container}>
      <StatusBar backgroundColor="black" barStyle="light-content"/>
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        navigation={navigation}
        showBackButton={true}
        showNextButton={true}
        onNext={handlePress}
      />
      <View style={Platform.OS === 'ios' ? firstNameScreen.iPhone : {}}>
      <ProgressBar progress={2 / 8} />
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
      </View>
      <InfoComponent infoText="Please enter a valid email address and phone number." />

    </View>
  );
};

export default EmailAndNumber;
