import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firstNameScreen, birthdayScreen, lastNameScreen, navbarStyles } from '../../components/styles2';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../../components/Navbar';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
import { Picker } from '@react-native-picker/picker';

const formatDate = (date) => {
  if (!date) {
    return 'DD/MM/YYYY';
  }
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  // return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
};

const BirthdayScreen = ({ navigation, route }) => {
  const [date, setDate] = useState(null);
  const [sex, setSex] = useState(null);
  const [showSexPicker, setShowSexPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);


  const toggleDatePicker = () => {
    setShowDatePicker(prevShowDatePicker => !prevShowDatePicker);
  };

  const toggleSexPicker = () => {
    setShowSexPicker(prevShowSexPicker => !prevShowSexPicker);
  };

  const onChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      console.log('Selected date:', selectedDate);
    }
  };

  // const showDatePicker = () => {
  //   setShow(true);
  // };

  const handlePress = () => {
    // const now = new Date();
    // const eighteenYearsAgo = new Date(now.setFullYear(now.getFullYear() - 18));

    // if (!date || date > eighteenYearsAgo) {
    //   Alert.alert('Validation error', 'You must be at least 18 years old.');
    //   return;
    // }

    // if (!sex) {
    //   Alert.alert('Validation error', 'Please select your biological sex.');
    //   return;
    // }

    navigation.navigate('Photos', { ...route.params, birthday: formatDate(date), sex });
  };

  return (
    <View style={birthdayScreen.birthdaycontainer}>
      
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        navigation={navigation}
        showBackButton={true}
        showNextButton={true}
        onNext={handlePress}
      />
      <ProgressBar progress={5 / 8} />
      <Text style={firstNameScreen.questionText}>When is your birthday?</Text>
      <TouchableOpacity onPress={toggleDatePicker} activeOpacity={1} style={birthdayScreen.birthdayTouchable}>
        <Text style={birthdayScreen.birthdaydateText}>{formatDate(date)}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
      <Text style={lastNameScreen.questionText}>What's your biological sex?</Text>
      {/* Top of view */}
      <View style={lastNameScreen.rectangle}>
    <TouchableOpacity 
      onPress={toggleSexPicker}
      style={{ flex: 1, justifyContent: 'center' }} // this line is added to center the text vertically and fill the entire View
    >
      <Text style={lastNameScreen.rectangleText}>{sex || 'Select Sex'}</Text>
    </TouchableOpacity>
    {showSexPicker && (
      <Picker
        selectedValue={sex}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
      >
        <Picker.Item label="Select Sex" value={null} />
        <Picker.Item label="Male" value="1" />
        <Picker.Item label="Female" value="2" />
      </Picker>
    )}
  </View>
      {/* Bottom of view */}
    </View>
  );
};

export default BirthdayScreen;
