import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { fightingStyleScreen, firstNameScreen, photosScreen } from './styles2';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from './Navbar';
import NextButton from './NextButton';

const CheckBox = ({ isChecked, onToggle }) => (
  <TouchableOpacity
    style={[fightingStyleScreen.checkBox, isChecked && fightingStyleScreen.checked]}
    onPress={onToggle}
  />
);

const martialArts = [
  'Karate', 'Judo', 'Taekwondo', 'Kung Fu', 'Brazilian Jiu-Jitsu',
  'Muay Thai', 'Boxing', 'Krav Maga', 'Capoeira', 'Aikido'
];

const FightingScreen = ({ navigation }) => {
  const [checkedMartialArts, setCheckedMartialArts] = useState([]);

  const toggleCheckbox = (martialArt) => {
    if (checkedMartialArts.includes(martialArt)) {
      setCheckedMartialArts(checkedMartialArts.filter(item => item !== martialArt));
    } else {
      setCheckedMartialArts([...checkedMartialArts, martialArt]);
    }
  };

  const renderItem = (item, index) => (
    <View
      style={[
        fightingStyleScreen.rectangle,
        index === 0 ? fightingStyleScreen.firstRectangle : null
      ]}
      key={item}
    >
      <Text style={[fightingStyleScreen.textStyle, fightingStyleScreen.rectangleText]}>{item}</Text>
      <CheckBox
        isChecked={checkedMartialArts.includes(item)}
        onToggle={() => toggleCheckbox(item)}
      />
    </View>
  );

  return (
    <View style={fightingStyleScreen.container}>
      <Navbar navigation={navigation} />
      <ScrollView contentContainerStyle={fightingStyleScreen.list}>
        {/* <Text style={fightingStyleScreen.fightrText}>Fightr.</Text> */}
        <Text style={firstNameScreen.questionText}>
          What fighting styles are you interested in? Tick at least one.
        </Text>
        {martialArts.map(renderItem)}
      </ScrollView>
      {/* <TouchableOpacity
        style={photosScreen.nextButton}
        onPress={() => navigation.navigate('FightingLevelScreen')}
      >
        <Text style={photosScreen.nextButtonText}>Next</Text>
      </TouchableOpacity> */}
      <NextButton
        onPress={() => navigation.navigate('FightingLevelScreen')}
      />
    </View>
  );
};

export default FightingScreen;
