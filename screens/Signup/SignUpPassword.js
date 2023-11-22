import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar, Alert } from 'react-native';
import { firstNameScreen, lastNameScreen } from '../../components/styles2';

import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../../components/Navbar';
import InfoComponent from '../../components/InfoComponent';
import ProgressBar from '../../components/ProgressBar';

const SignUpPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lower case character.';
    }

    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one upper case character.';
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return 'Password must contain at least one special character.';
    }

    return null;
  };

  const handlePress = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      Alert.alert('Validation error', passwordError);
      return;
    }

    navigation.navigate('HeightAndWeight', { ...route.params, password });
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
      <ProgressBar progress={3 / 8} />
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
</View>
<InfoComponent infoText="Your password has to be at least 8 characters long, have one lower case letter, an upper case letter, and a special character" />

    </View>
  );
};

export default SignUpPassword;
