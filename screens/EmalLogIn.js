import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // import useSelector
import { login } from '../redux/actions';
import { useNavigation } from '@react-navigation/native';
import { firstNameScreen, lastNameScreen, emailLogin } from '../components/styles2';
import Navbar from '../components/Navbar';
import PopUp from '../components/PopUp';

const EmailLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleSignIn = async () => {
    const result = await dispatch(login(email, password)); // login is now an async action

    console.log(result);
    console.log(result)

    if (result) {
      navigation.navigate('MainFlow');
    } else {
      // handle unsuccessful login
      setErrorMessage('Incorrect Email/Password.'); // Set the error message
      togglePopup(); // Show the popup
    }

  };

  return (
    <View style={firstNameScreen.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Navbar navigation={navigation} backgroundColor="#000000" textColor="#FFFFFF" showBackButton={true} />
      <PopUp
        isVisible={isPopupVisible}
        onClose={togglePopup}
        errorMessage={errorMessage}
      />
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

      {/* <TouchableOpacity onPress={() => navigation.navigate('ForgottenPassword')}>
        <Text style={emailLogin.forgottenPasswordText}>Forgotten Password?</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={emailLogin.signInButton} onPress={handleSignIn}>
        <Text style={emailLogin.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailLogin;
