import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { fightingStyleScreen, firstNameScreen } from '../../components/styles2';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../../components/Navbar';
import NextButton from '../../components/NextButton';

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

const FightingScreen = ({ navigation, route }) => {
  const [checkedMartialArts, setCheckedMartialArts] = useState([]);

  const toggleCheckbox = (martialArt) => {
    if (checkedMartialArts.includes(martialArt)) {
      setCheckedMartialArts(checkedMartialArts.filter(item => item !== martialArt));
    } else {
      setCheckedMartialArts([...checkedMartialArts, martialArt]);
    }
  };

  const handlePress = () => {
    navigation.navigate('FightingLevelScreen', {
      ...route.params, // Pass the data from previous signup steps
      checkedMartialArts,
    });
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
      <Navbar
        navigation={navigation}
        showBackButton={true}
        showNextButton={true}
        onNext={handlePress}
      />
      <ScrollView contentContainerStyle={fightingStyleScreen.list}>
        <Text style={firstNameScreen.questionText}>
          What fighting styles are you interested in? Tick at least one.
        </Text>
        {martialArts.map(renderItem)}
      </ScrollView>
      {/* <NextButton onPress={handleNextPress} /> */}
    </View>
  );
};

export default FightingScreen;
