import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { firstNameScreen, lastNameScreen, photosScreen, heightWeightScreen } from '../../components/styles2';
import Navbar from '../../components/Navbar';
import NextButton from '../../components/NextButton';

const HeightAndWeight = ({ navigation, route }) => {
  // const { firstName, lastName, email, phoneNumber } = route.params;
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');

  const toggleHeightUnit = () => {
    setHeightUnit(heightUnit === 'cm' ? 'ft' : 'cm');
  };

  const toggleWeightUnit = () => {
    setWeightUnit(weightUnit === 'kg' ? 'lbs' : 'kg');
  };

  const handlePress = () => {
    navigation.navigate('Birthday', { firstName, lastName, email, phoneNumber, weight, height });
  };

  return (
    <View style={firstNameScreen.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Navbar
        navigation={navigation}
        showBackButton={true}
        showNextButton={true}
        onNext={handlePress}
      />
      <Text style={firstNameScreen.questionText}>How tall are you?</Text>
      <TextInput
        style={firstNameScreen.rectangle}
        value={height}
        onChangeText={setHeight}
        placeholder={`Height (${heightUnit})`}
        placeholderTextColor="white"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={toggleHeightUnit} style={heightWeightScreen.heightUnitToggle}>
        <Text style={[heightWeightScreen.unitText, heightUnit === 'cm' && heightWeightScreen.activeUnit]}>cm</Text>
        <Text style={heightWeightScreen.separator}>/</Text>
        <Text style={[heightWeightScreen.unitText, heightUnit === 'ft' && heightWeightScreen.activeUnit]}>ft</Text>
      </TouchableOpacity>
      <Text style={lastNameScreen.questionText}>What's your weight?</Text>
      <TextInput
        style={lastNameScreen.rectangle}
        value={weight}
        onChangeText={setWeight}
        placeholder={`Weight (${weightUnit})`}
        placeholderTextColor="white"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={toggleWeightUnit} style={heightWeightScreen.weightUnitToggle}>
        <Text style={[heightWeightScreen.unitText, weightUnit === 'kg' && heightWeightScreen.activeUnit]}>kg</Text>
        <Text style={heightWeightScreen.separator}>/</Text>
        <Text style={[heightWeightScreen.unitText, weightUnit === 'lbs' && heightWeightScreen.activeUnit]}>lbs</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeightAndWeight;
