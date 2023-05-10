import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { firstNameScreen, lastNameScreen, photosScreen } from './styles2';
import Icon from 'react-native-vector-icons/FontAwesome';

import Navbar from './Navbar';

const ForgottenPassword = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <View style={firstNameScreen.container}>
        <Navbar navigation={navigation} />
    
      <Text style={firstNameScreen.questionText}>UNDER CONSTRUCTION</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <Icon name="lock" size={100} color="black" />
</View>
  </View>
  );
};



export default ForgottenPassword;


