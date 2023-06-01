import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';
import { firstNameScreen, lastNameScreen } from '../../components/styles2';

import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../../components/Navbar';
import NextButton from '../../components/NextButton';

const SignUpPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const handlePress = () => {
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  navigation.navigate('HeightAndWeight', { ...route.params, password });
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
      <Text style={firstNameScreen.questionText}>Create your password</Text>
      <TextInput
  style={firstNameScreen.rectangle}
  value={password}
  onChangeText={setPassword}
  placeholder="Password"
  placeholderTextColor="white"
  secureTextEntry={true}
  autoCapitalize="none"
/>
      <Text style={lastNameScreen.questionText}>Re-enter your password</Text>
      <TextInput
  style={lastNameScreen.rectangle}
  value={confirmPassword}
  onChangeText={setConfirmPassword}
  placeholder="Confirm Password"
  placeholderTextColor="white"
  secureTextEntry={true}
  autoCapitalize="none"
/>
      {/* <NextButton onPress={handlePress} /> */}
    </View>
  );
};

export default SignUpPassword;
