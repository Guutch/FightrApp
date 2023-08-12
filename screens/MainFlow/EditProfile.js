import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Navbar from '../../components/Navbar';
import { settingsStyles, welcomeStyles } from '../../components/styles2';
import SettingSection from '../../components/SettingSection';
import { fetchEditProfileData } from '../../api';
import { useSelector } from 'react-redux';

const EditProfileScreen = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [heightUnit, setHeightUnit] = useState('');
  const [weightUnit, setWeightUnit] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [weightClass, setWeightClass] = useState('');
  const [fightingLevel, setFightingLevel] = useState('');
  const [fightingStyle, setFightingStyle] = useState('');
  const [value, onChangeText] = useState('');

  const { usersName } = route.params;

  const userId = useSelector(state => state.user);  // Gets the userId from the Redux state

  const fightingLevels = {
    1: 'Professional',
    2: 'Amateur Competitor',
    3: 'Advanced',
    4: 'Intermediate',
    5: 'Beginner',
    6: 'Novice',
  };

  const getFightingLevelName = (levelNumber) => {
    return fightingLevels[levelNumber];
  };

  const fightingStyles = {
    1: 'Boxing',
    2: 'Brazilian Jiu-Jitsu',
    3: 'Muay Thai',
    4: 'Wrestling',
    5: 'Kickboxing',
    6: 'Jiu-Jitsu',
    7: 'Judo',
    8: 'Karate',
    9: 'Kung Fu',
    10: 'Taekwondo',
  };

  const getFightingStyleName = (styleNumber) => {
    return fightingStyles[styleNumber];
  };



  const weightClasses = {
    1: 'Heavyweight',
    2: 'Light Heavyweight',
    3: 'Middleweight',
    4: 'Welterweight',
    5: 'Lightweight',
    6: 'Featherweight',
    7: 'Bantamweight',
    8: 'Flyweight',
    9: 'Strawweight',
  };

  const getWeightClassName = (classNumber) => {
    return weightClasses[classNumber];
  };

  const weightUnitMapping = {
    1: 'kg',
    2: 'lbs'
  };

  const heightUnitMapping = {
    1: 'cm',
    2: 'ft'
  };

  const getKeyByValue = (object, value) => {
    const entry = Object.entries(object).find(([key, val]) => val === value);
    return entry ? entry[0] : null;
  };
  
  const updateFightingLevel = (newLevel) => {
    const keyForNewLevel = getKeyByValue(fightingLevels, newLevel);
    console.log(keyForNewLevel); // This will log the key corresponding to the newLevel
    setFightingLevel(keyForNewLevel);
  };

  const updateFightingStyle = (newStyles) => {
    setFightingStyle(newStyles);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEditProfileData(userId.userId);
      console.log(data);

      // if (data && data.firstName) {
      //     setFirstName(data.firstName)
      // }
      // if (data && data.lastName) {
      //     setLastName(data.lastName)
      // }
      // // Will need API (Google maps/OSM) to convert from coordinates to city/town
      // if (data && data.location) {
      //     setLocation(data.location)
      //     console.log(location)
      // }

      if (data) {
        // setHeightUnit(data.heightUnit);
        setWeightUnit(weightUnitMapping[data.weightUnit]);
        setHeightUnit(heightUnitMapping[data.weightUnit]);
        // console.log(weightUnitMapping[data.weightUnit])
        // setWeightUnit(weightUnitMapping(data.weightUnit.wei));
        setHeight(data.actualHeight);
        console.log(data.actualHeight);
        setWeight(data.actualWeight);
        setFightingLevel(data.usersFightLevel);

        const styleNames = data.usersFightStyles.map(getFightingStyleName);
        setFightingStyle(styleNames.join(', '));
        setWeightClass(data.weightClass)
      }

      // if (data && data.fightingStyle) {
      //     setFightingStyle(data.fightingStyle.join(', '));
      // }

    };
    fetchData();
  }, [userId]);

  return (
    <View>
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        showBackButton={true}
        navigation={navigation}  // Here we pass navigation as a prop to Navbar
        title="Edit Profile"  // Here's the custom title
      />
      <ScrollView contentContainerStyle={settingsStyles.container}>

        <SettingSection title="Name" onPress={() => navigation.navigate('SomeScreen')} preference={usersName} />
        <SettingSection title="Fighting Style(s)"
          onPress={() => navigation.navigate('PreferenceSel', {
            preferences: Object.values(fightingStyles),
            title: 'What are your combat sports',
            type: 'fightingStyleEdit', // Pass the type
            currentPref: fightingStyle,
            updateFightingStyle: updateFightingStyle
          })}
          preference={fightingStyle} // Use the fightingStyle state directly, as it's already a joined string
          showChevron={true}
        />
        <SettingSection title="Fighting Level"
          onPress={() => navigation.navigate('PreferenceSel', {
            preferences: Object.values(fightingLevels),
            title: 'What is your combat sport proficiency',
            type: 'fightingLevelEdit', // Pass the type
            currentPref: getFightingLevelName(fightingLevel),
            updateFightingLevel: updateFightingLevel
          })}
          preference={getFightingLevelName(fightingLevel)}
          showChevron={true}
        />
        <SettingSection title="Height" preference={`${height} ${heightUnit}`} showChevron={true} />
        <SettingSection title="Weight" onPress={() => navigation.navigate('SomeScreen')} preference={`${weight} ${weightUnit}`} showChevron={true} />
        {/* <SettingSection title="Location" onPress={() => navigation.navigate('SomeScreen')} /> */}
        <SettingSection title="Weight Class" onPress={() => navigation.navigate('SomeScreen')} preference={getWeightClassName(weightClass)} />
        {/* <SettingSection title="Years Experience" onPress={() => navigation.navigate('SomeScreen')} /> */}
        <Text style={settingsStyles.sectionTitle}>Bio (Not connected/Doesn't work)</Text>
        {/* Doesn't work */}
        <View style={settingsStyles.sectionContainer}
          style={{
            backgroundColor: value,
            borderColor: '#000000',
            borderWidth: 1,
          }}>
          <TextInput
            editable
            multiline
            // numberOfLines={4}
            maxLength={40}
            onChangeText={text => onChangeText(text)}
            value={value}
            style={{ padding: 40 }}
          />
        </View>
      </ScrollView>


    </View>
  );
};

export default EditProfileScreen;
