import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Dimensions, Alert } from 'react-native';
import { firstNameScreen, lastNameScreen, photosScreen, heightWeightScreen } from '../../components/styles2';
import Navbar from '../../components/Navbar';
import InfoComponent from '../../components/InfoComponent';
import ProgressBar from '../../components/ProgressBar';

const HeightAndWeight = ({ navigation, route }) => {
  const [height, setHeight] = useState(''); // Height in cm 
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  let convertedHeight=0;

  const toggleHeightUnit = () => {
    setHeightUnit(heightUnit === 'cm' ? 'ft' : 'cm');
  };

  const toggleWeightUnit = () => {
    setWeightUnit(weightUnit === 'kg' ? 'lbs' : 'kg');
  };

  const handlePress = () => {
    if (!weight) {
      Alert.alert('Validation error', 'Weight cannot be empty.');
      return;
    }
    if(heightUnit==="cm" && !height) {
      Alert.alert('Validation error', 'Height (cm) cannot be empty.')
    }
    if(heightUnit==="ft" && !heightFeet && !heightInches) {
      Alert.alert('Validation error', 'Height (ft) cannot be empty.')
    }
  
    // Height Validations
    if (heightUnit === "cm") {
      if (!height || isNaN(height) || height > 300) {
        Alert.alert("Validation error", "You cannot enter a height more than 300cm")
        return;
      }
    } else {
      if (!heightFeet || isNaN(heightFeet) || heightFeet > 10) {
        Alert.alert("Validation error", "Feet must be a number less than or equal to 10ft")
        return;
      }
  
      if (!heightInches || isNaN(heightInches) || heightInches > 12) {
        Alert.alert("Validation error", "Inches must be a number less than or equal to 12in.")
        return;
      }
      convertedHeight=parseInt(heightFeet*12)+parseInt(heightInches);
      // console.log(heightFeet)
      // console.log(heightInches)
      // setHeight(convertedHeight)
    }
  
    // Weight Validation
    if (weightUnit === "kg") {
      if (!weight || isNaN(weight) || weight > 600) {
        Alert.alert('Validation error', 'Weight must be a number less than or equal to 600kg.');
        return;
      }
    } else {
      if (!weight || isNaN(weight) || weight > 1323) {
        Alert.alert('Validation error', 'Weight must be a number less than or equal to 1323lbs.');
        return;
      }
    }
  
    console.log(height)
    console.log("Height is aboove")

    if(heightUnit==="ft") {
      navigation.navigate('Birthday', { ...route.params, height: convertedHeight, weight, heightUnit, weightUnit });
    } else {
      navigation.navigate('Birthday', { ...route.params, height, weight, heightUnit, weightUnit });
    }

    
  };
  

  return (
    <View style={firstNameScreen.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        navigation={navigation}
        showBackButton={true}
        showNextButton={true}
        onNext={handlePress}
      />
      <ProgressBar progress={4 / 8} />
      <Text style={firstNameScreen.questionText}>How tall are you?</Text>

      {heightUnit === 'ft' ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: screenWidth * 0.8,
            // right: screenWidth * 0.2, // adjust this value to shift inputs to the left
            position: 'absolute',
            // top: screenHeight * 0.227 
          }}
        >
          <TextInput
            style={[firstNameScreen.rectangle, { width: screenWidth * 0.24, position: 'relative', paddingRight: screenWidth * 0.02 }]}
            value={heightFeet}
            onChangeText={setHeightFeet}
            placeholder={`Feet`}
            placeholderTextColor="white"
            keyboardType="numeric"
          />
          <TextInput
            style={[firstNameScreen.rectangle, { width: screenWidth * 0.24, position: 'relative', paddingLeft: screenWidth * 0.02 }]}
            value={heightInches}
            onChangeText={setHeightInches}
            placeholder={`Inches`}
            placeholderTextColor="white"
            keyboardType="numeric"
          />
        </View>
      ) : (
        <TextInput
          style={firstNameScreen.rectangle}
          value={height}
          onChangeText={setHeight}
          placeholder={`Height (${heightUnit})`}
          placeholderTextColor="white"
          keyboardType="numeric"
        />
      )}
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
      <InfoComponent infoText="Your height cannot be more than 300cm/10ft. Inches cannot exceed 13. Your weight cannot be more than 600kg/1323lbs." />

    </View>
  );
};

export default HeightAndWeight;
