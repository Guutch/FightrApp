import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { fightingStyleScreen, firstNameScreen } from '../../components/styles2';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from '../../components/Navbar';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';

const CheckBox = ({ isChecked, onToggle }) => (
  <TouchableOpacity
    style={[fightingStyleScreen.checkBox, isChecked && fightingStyleScreen.checked]}
    onPress={onToggle}
  />
);

const martialArts = {
  1: 'Boxing',
  2: 'Brazilian Jiu-Jitsu',
  3: 'Muay Thai',
  4: 'Wrestling',
  5: 'Kickboxing',
  6: 'Jiu-Jitsu',
  7: 'Judo',
  8: 'Karate',
  9: 'Kung Fu',
  10: 'Taekwondo'
};
const FightingScreen = ({ navigation, route }) => {
  const [checkedMartialArts, setCheckedMartialArts] = useState([]);

  useEffect(() => {
    if (route.params.userPreferences) {
      setCheckedMartialArts(route.params.userPreferences);
    }
    console.log(checkedMartialArts)
  }, []);

  const toggleCheckbox = (martialArtKey) => {
    if (checkedMartialArts.includes(martialArtKey)) {
      setCheckedMartialArts(checkedMartialArts.filter(key => key !== martialArtKey));
    } else {
      if (checkedMartialArts.length < 3) {
        setCheckedMartialArts([...checkedMartialArts, martialArtKey]);
      } else {
        Alert.alert('Maximum selections reached', 'You can select up to 3 combat sports.');
      }
    }
  };
  

  const handlePress = () => {
    if (checkedMartialArts.length === 0) {
      Alert.alert('Validation error', 'You must select at least one combat sport.');
      return;
    }

    if (route.params.isUpdate) {
      // Update user preferences code
      navigation.goBack();
    } else {
      navigation.navigate('FightingLevelScreen', {
        ...route.params, // Pass the data from previous signup steps
        checkedMartialArts,
      });
    }
  };

  const renderItem = (martialArtKey, index) => {
    const item = martialArts[martialArtKey];
    return (
      <View
        style={[
          fightingStyleScreen.rectangle,
          index === 0 ? fightingStyleScreen.firstRectangle : null
        ]}
        key={item}
      >
        <Text style={[fightingStyleScreen.textStyle, fightingStyleScreen.rectangleText]}>{item}</Text>
        <CheckBox
          isChecked={checkedMartialArts.includes(Number(martialArtKey))}
          onToggle={() => toggleCheckbox(Number(martialArtKey))}
        />
      </View>
    );
  };
  

  return (
    <View style={fightingStyleScreen.container}>
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        navigation={navigation}
        showBackButton={true}
        showNextButton={true}
        onNext={handlePress}
      />
      <ProgressBar progress={7/8} />
      <ScrollView contentContainerStyle={fightingStyleScreen.list}>
        <Text style={firstNameScreen.questionText}>
          What fighting styles are you interested in? Tick at least one.
        </Text>
        {Object.keys(martialArts).map(renderItem)}
      </ScrollView>
      {/* <NextButton onPress={handleNextPress} /> */}
    </View>
  );
};

export default FightingScreen;
