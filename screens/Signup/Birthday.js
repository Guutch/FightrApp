import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firstNameScreen, birthdayScreen, lastNameScreen, navbarStyles } from '../../components/styles2';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../../components/Navbar';
import PopUp from '../../components/PopUp';
import InfoComponent from '../../components/InfoComponent';
// import SettingSection from '../../components/SettingSection';
import ProgressBar from '../../components/ProgressBar';
// import { Picker } from '@react-native-picker/picker';

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState("Please Select");
  const options =
  [
        { preference: 'Male' },
        { preference: 'Female' },
        // { preference: 'Oth' }
      ];

  const toggleDatePicker = () => {
    setShowDatePicker(prevShowDatePicker => !prevShowDatePicker);
    
  };

  const onChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      console.log('Selected date:', selectedDate);
    }
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handlePreferenceChange = (newPreference) => {
    setSelectedPreference(newPreference);
    setSex(newPreference)
    setPopupVisible(!isPopupVisible);
  };

  const handlePress = () => {
    const now = new Date();
    const eighteenYearsAgo = new Date(now.setFullYear(now.getFullYear() - 18));

    if (!date || date > eighteenYearsAgo) {
      Alert.alert('Validation error', 'You must be at least 18 years old.');
      return;
    }

    if (!sex) {
      Alert.alert('Validation error', 'Please select your biological sex.');
      return;
    }

    navigation.navigate('Photos', { ...route.params, birthday: formatDate(date), sex });
  };

  return (
    <View style={firstNameScreen.container}>
<StatusBar backgroundColor="black" barStyle="light-content" />
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        navigation={navigation}
        showBackButton={true}
        showNextButton={true}
        onNext={handlePress}
      />
<View style={Platform.OS === 'ios' ? firstNameScreen.iPhone : {}}>
      <PopUp
        isVisible={isPopupVisible}
        onClose={togglePopup}
        options={options}
        selectedPreference={selectedPreference}
        sexSelector={true}
        onPreferenceChange={handlePreferenceChange}
      />
      <ProgressBar progress={5 / 8} />
      <Text style={firstNameScreen.questionText}>When is your birthday?</Text>
      <TouchableOpacity onPress={toggleDatePicker} activeOpacity={0.5} style={birthdayScreen.birthdayTouchable}>
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
      <TouchableOpacity style={lastNameScreen.rectangle} onPress={togglePopup}>
      <Text style={lastNameScreen.rectangleText}>{selectedPreference}</Text>
</TouchableOpacity>
      {/* Bottom of view */}
      </View>
      <InfoComponent infoText="You have to be at least 18 years old to use Fytr!" />
    </View>
  );
};

export default BirthdayScreen;
