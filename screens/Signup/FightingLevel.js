import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fightingStyleScreen, firstNameScreen, photosScreen } from '../../components/styles2';
import Navbar from '../../components/Navbar';
import NextButton from '../../components/NextButton';

const CheckBox = ({ isChecked, onToggle }) => (
  <TouchableOpacity
    style={[fightingStyleScreen.checkBox, isChecked && fightingStyleScreen.checked]}
    onPress={onToggle}
  />
);

const levels = ['Professional', 'Amateur Competitor', 'Advanced', 'Intermediate', 'Beginner', 'Novice'];

const FightingLevelScreen = ({ navigation, route }) => {
  const [checkedLevel, setCheckedLevel] = useState(null);

  const toggleCheckbox = (level) => {
    setCheckedLevel(checkedLevel === level ? null : level);
  };

  const handlePress = () => {
    navigation.navigate('SignUpLocation', {
      ...route.params, // Pass the data from previous signup steps
      checkedLevel,
    });
  };

  const renderItem = (item, index) => (
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
      <CheckBox isChecked={checkedLevel === item} onToggle={() => toggleCheckbox(item)} />
    </View>
  );

  return (
    <View style={fightingStyleScreen.container}>
      <Navbar
        navigation={navigation}
        showBackButton={true}
        showNextButton={true}
        onNext={handlePress}
      />
      <ScrollView contentContainerStyle={fightingStyleScreen.list}>
        <Text style={firstNameScreen.questionText}>
          How good is your fight game? This will help us match you with others!
        </Text>
        {levels.map(renderItem)}
      </ScrollView>
      {/* <NextButton onPress={handleNextPress} /> */}
    </View>
  );
};

export default FightingLevelScreen;
