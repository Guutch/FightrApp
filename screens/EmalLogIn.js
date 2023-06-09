import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // import useSelector
import { login } from '../redux/actions';

import { firstNameScreen, lastNameScreen, emailLogin } from '../components/styles2';
import Navbar from '../components/Navbar';

const EmailLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // Get the userId from the Redux state
  const userId = useSelector(state => state.user);

  const handleSignIn = () => {
    dispatch(login(email, password)); // dispatch the login action when the sign-in button is pressed
    console.log(userId); // Print the userId to the console
  };

  return (
    <View style={firstNameScreen.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Navbar navigation={navigation} />

      <Text style={firstNameScreen.questionText}>Email address</Text>
      <TextInput
        style={firstNameScreen.rectangle}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="white"
        keyboardType="email-address"
      />

      <Text style={lastNameScreen.questionText}>Password</Text>
      <TextInput
        style={lastNameScreen.rectangle}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgottenPassword')}>
        <Text style={emailLogin.forgottenPasswordText}>Forgotten Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={emailLogin.signInButton} onPress={handleSignIn}>
        <Text style={emailLogin.signInButtonText}>Sign in</Text>
      </TouchableOpacity>

      <View style={emailLogin.signUpContainer}>
        <Text>
          New Here?{' '}
          <Text style={emailLogin.signUpText} onPress={() => navigation.navigate('SignUpFlow')}>
            Sign Up!
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default EmailLogin;
