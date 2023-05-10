import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firstNameScreen, birthdayScreen, photosScreen, navbarStyles } from '../../components/styles2';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../../components/Navbar';
import NextButton from '../../components/NextButton';

const formatDate = (date) => {
  if (!date) {
    return 'DD/MM/YYYY';
  }
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
};

const BirthdayScreen = ({ navigation, route }) => {
  const { firstName, lastName, email, phoneNumber, weight, height } = route.params;
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      console.log('Selected date:', selectedDate);
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const handlePress = () => {
    navigation.navigate('Photos', { firstName, lastName, email, phoneNumber, weight, height, birthday: formatDate(date) });
  };

  return (
    <View style={birthdayScreen.birthdaycontainer}>
      <Navbar navigation={navigation} />
      <Text style={firstNameScreen.questionText}>When is your birthday?</Text>
      <TouchableOpacity onPress={showDatePicker} activeOpacity={1} style={birthdayScreen.birthdayTouchable}>
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
      <NextButton onPress={handlePress} />
    </View>
  );
};

export default BirthdayScreen;
