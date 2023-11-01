import React, { useState } from 'react';
import { View, StatusBar, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fightingStyleScreen, firstNameScreen, photosScreen } from '../../components/styles2';
import Navbar from '../../components/Navbar';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
const CheckBox = ({ isChecked, onToggle }) => (
  <TouchableOpacity
    style={[fightingStyleScreen.checkBox, isChecked && fightingStyleScreen.checked]}
    onPress={onToggle}
  />
);

// const levels = ['Professional', 'Amateur Competitor', 'Advanced', 'Intermediate', 'Beginner', 'Novice'];

const levels = {
  1: 'Professional',
  2: 'Amateur Competitor',
  3: 'Advanced',
  4: 'Intermediate',
  5: 'Beginner',
  6: 'Novice',
};

const FightingLevelScreen = ({ navigation, route }) => {
  const [checkedLevel, setCheckedLevel] = useState(null);

  // const toggleCheckbox = (level) => {
  //   setCheckedLevel(checkedLevel === level ? null : level);
  // };

  const toggleCheckbox = (levelKey) => {
    setCheckedLevel(levelKey);
  };

  const handlePress = () => {
    if (!checkedLevel) {
      Alert.alert('Validation error', 'You must select a fighting level.');
      return;
    }

    navigation.navigate('SignUpLocation', {
      ...route.params, // Pass the data from previous signup steps
      checkedLevel,
    });
  };

  const renderItem = (levelKey, index) => {
    const item = levels[levelKey];
    return (
      <View
        style={[
          fightingStyleScreen.rectangle,
          index === 0 ? fightingStyleScreen.firstRectangle : null,
        ]}
        key={item}
      >
        <Text style={[fightingStyleScreen.textStyle, fightingStyleScreen.rectangleText]}>
          {item}
        </Text>
        <CheckBox isChecked={checkedLevel === Number(levelKey)} onToggle={() => toggleCheckbox(Number(levelKey))} />
      </View>
    );
  };

  return (
    <View style={fightingStyleScreen.container}>
      <StatusBar backgroundColor="black" barStyle="light-content"/>
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        navigation={navigation}
        showBackButton={true}
        showNextButton={true}
        onNext={handlePress}
      />
      <ProgressBar progress={8 / 8} />
      <ScrollView contentContainerStyle={fightingStyleScreen.list}>
        <Text style={fightingStyleScreen.questionText}>
          How good is your fight game? This will help us match you with others!
        </Text>
        {Object.keys(levels).map(renderItem)}
      </ScrollView>
      {/* <NextButton onPress={handleNextPress} /> */}
    </View>
  );
};

export default FightingLevelScreen;
