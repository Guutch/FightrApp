import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import styles from './styles';
import {firstNameScreen, birthdayScreen} from './styles2';

const BirthdayScreen = ({ navigation }) => {
  return (
    <View style={birthdayScreen.birthdaycontainer}>
      <Text style={birthdayScreen.birthdayfightrText}>Fightr.</Text>
      <Text style={birthdayScreen.birthdayquestionText}>When is your birthday?</Text>
      <Text style={birthdayScreen.birthdaydateText}>DD MM YYYY</Text>
      <View style={birthdayScreen.birthdaycontainer}>
      <TouchableOpacity style={birthdayScreen.birthdaybutton} onPress={() => navigation.navigate('FirstName')}>
        <Text style={birthdayScreen.birthdaybuttonText}>Go to FirstName</Text>
      </TouchableOpacity>
      <TouchableOpacity style={birthdayScreen.birthdaybutton} onPress={() => navigation.navigate('Photos')}>
        <Text style={birthdayScreen.birthdaybuttonText}>Go to AddPhotos</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default BirthdayScreen;