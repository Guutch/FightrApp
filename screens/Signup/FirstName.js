// FirstName.js
import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar, Alert } from 'react-native';
import { firstNameScreen, lastNameScreen } from '../../components/styles2';

import Navbar from '../../components/Navbar';
import ProgressBar from '../../components/ProgressBar';
import InfoComponent from '../../components/InfoComponent';
import PopUp from '../../components/PopUp';
// import {togglePopup} from '../../PopupState'

const FirstName = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  }; 

  const handlePress = () => {
   
    if (!firstName || firstName.trim() === '') {
      setErrorMessage('First name cannot be empty.'); // Set the error message
      togglePopup(); // Show the popup
      return;
    }
    // ... other conditions where you set different error messages
    
    if (/\d/.test(firstName || lastName)) {
      setErrorMessage('Your name cannot contain digits.'); // Set the error message
      togglePopup(); // Show the popup
      return;
    }

    if (!lastName || lastName.trim() === '') {
      setErrorMessage('Last name cannot be empty.'); // Set the error message
      togglePopup(); // Show the popup
      return;
    }

    // navigation.navigate('Photos', { firstName, lastName });
    navigation.navigate('EmailAndNumber', { firstName, lastName });
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
      <ProgressBar progress={1 / 8} />
      <PopUp
  isVisible={isPopupVisible}
  onClose={togglePopup}
  errorMessage={errorMessage}
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
      <InfoComponent infoText="Both fields need to be completed. We don't accept numbers." />
    </View>
  );
};

export default FirstName;