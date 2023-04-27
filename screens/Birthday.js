import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firstNameScreen, birthdayScreen, photosScreen, navbarStyles } from './styles2';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from './Navbar';
import NextButton from './NextButton';

const formatDate = (date) => {
  if (!date) {
    return 'DD/MM/YYYY';
  }
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
};

const BirthdayScreen = ({ navigation }) => {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      storeData(selectedDate.toISOString()); // Save the user's birthday to local storage
      console.log('Selected date:', selectedDate); // Print the selected date to the console
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={birthdayScreen.birthdaycontainer}>
      <Navbar navigation={navigation} />
      <Text style={firstNameScreen.questionText}>When is your birthday?</Text>
      <TouchableOpacity onPress={showDatePicker} activeOpacity={1}>
        <Text style={birthdayScreen.birthdaydateText}>{formatDate(date)}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
      {/* <TouchableOpacity
        style={photosScreen.nextButton}
        onPress={() => navigation.push('Photos')}
      >
        <Text style={photosScreen.nextButtonText}>Next</Text>
      </TouchableOpacity> */}
      <NextButton
        onPress={() => navigation.navigate('Photos')}
      />
    </View>
  );
};

export default BirthdayScreen;
