// screens/MainFlow/SettingsScreen.js
import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Navbar from '../../components/Navbar';
import { settingsStyles, fightingStyleScreen } from '../../components/styles2'
import SettingSection from '../../components/SettingSection'
import { fetchUserPreferences } from '../../api';  // update the path according to your project structure
import { useDispatch, useSelector } from 'react-redux';
import { updatePreferences, updateFightingLevelEdit } from '../../redux/actions';

// Need to investigate this. Particularly for the other settings
const DividerTitle = ({ title }) => {
  return (
    <Text style={settingsStyles.dividerTitle}>{title}</Text>
  );
};


const MetricsSection = ({ title, option1, option2, selected, onSelect }) => {
  return (
    <View style={settingsStyles.metricsMargin}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <View style={settingsStyles.titleAndValueContainer}>
        <Text style={settingsStyles.sectionTitle}>{title}</Text>
        <View style={settingsStyles.unitToggle}>
          <TouchableOpacity onPress={() => onSelect(option1)}>
            <Text style={[settingsStyles.unitText, selected === option1 && settingsStyles.activeUnit]}>{option1}</Text>
          </TouchableOpacity>
          <Text style={settingsStyles.separator}>/</Text>
          <TouchableOpacity onPress={() => onSelect(option2)}>
            <Text style={[settingsStyles.unitText, selected === option2 && settingsStyles.activeUnit]}>{option2}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const SettingsScreen = ({ navigation }) => {
  const [distance, setDistance] = useState(10);
  const [ageRange, setAgeRange] = useState([18, 30]);
  const [heightUnit, setHeightUnit] = useState(null);
  const [weightUnit, setWeightUnit] = useState(null);
  const [distanceUnit, setDistanceUnit] = useState(null);
  const [weightClass, setWeightClass] = useState(null);
  const [originalHeightUnit, setOriginalHeightUnit] = useState(null);
  const [originalWeightUnit, setOriginalWeightUnit] = useState(null);
  const [fightingStylePreference, setFightingStylePreference] = useState('');  // Add this line
  const [fightingLevelPreference, setFightingLevelPreference] = useState('');  // Add this line
  const [usersFightLevel, setusersFightLevel] = useState('');  // Add this line
  const [availableClasses, setavailableClasses] = useState('');
  const [weightRange, setWeightRange] = useState("");
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.preferences);

  const userId = useSelector(state => state.user);  // Gets the userId from the Redux state

  const handleSavePreferences = (dataToUpdate) => {
    // Update preferences in the Redux store
    dispatch(updateFightingLevelEdit(dataToUpdate));
  };

  const distanceChange = (values) => {
    const value = values[0];
    setDistance(distanceUnit === 'km' ? Math.floor(value / 1.609) : value);
  };

  const ageRangeChange = (values) => {
    setAgeRange(values);
  };

  // Need to use this when selecting weight preference. Need to look at changing to enum instead for time being
  // Will need brain power
  const getUserWeightClasses = (userWeight) => {
    let primaryClassIndex = null;

    // Identify the primary weight class
    for (let i = 0; i < weightClasses.length; i++) {
      if (weightClasses[i].range[0] <= userWeight && userWeight <= weightClasses[i].range[1]) {
        primaryClassIndex = i;
        break;
      }
    }

    // Check for edge cases: User's weight is at the lower or upper limit of weight classes
    if (primaryClassIndex === 0) {
      // User's weight is at the lowest limit, can only go up
      return [weightClasses[0].name, weightClasses[1].name];
    } else if (primaryClassIndex === weightClasses.length - 1) {
      // User's weight is at the upper limit, can only go down
      return [weightClasses[weightClasses.length - 2].name, weightClasses[weightClasses.length - 1].name];
    } else {
      // User's weight is in the middle, can go either up or down
      return [weightClasses[primaryClassIndex - 1].name, weightClasses[primaryClassIndex].name, weightClasses[primaryClassIndex + 1].name];
    }
  }

  // Fight Level function
  const generateLevels = (currentValue, type) => {
    console.log("usersFightLevel", usersFightLevel)
    console.log('Current Value:', currentValue); // Debugging
    console.log('Type:', type); // Debugging

    const mapping = type === 'fightingLevel' ? fightingLevels : weightClasses;
    console.log('Mapping:', mapping); // Debugging

    const allPreferences = Object.values(mapping);
    const currentPreference = mapping[currentValue];
    console.log('Current Preference:', currentPreference); // Debugging

    const currentIndex = allPreferences.indexOf(currentPreference);
    console.log('Current Index:', currentIndex); // Debugging

    // Check for edge cases
    if (currentIndex === 0) {  // If user is at the top of the range
      return allPreferences.slice(0, 2);
    } else if (currentIndex === allPreferences.length - 1) {  // If user is at the bottom of the range
      return allPreferences.slice(-2);
    } else {  // All other cases
      return allPreferences.slice(currentIndex - 1, currentIndex + 2);
    }
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

  const weightClasses = {
    1: 'Strawweight',
    2: 'Flyweight',
    3: 'Bantamweight',
    4: 'Featherweight',
    5: 'Lightweight',
    6: 'Welterweight',
    7: 'Middleweight',
    8: 'Light Heavyweight',
    9: 'Heavyweight',
  };

  const getWeightClassName = (classNumber) => {
    return weightClasses[classNumber];
  };

  const heightUnitMapping = {
    1: 'cm',
    2: 'ft'
  };

  const weightUnitMapping = {
    1: 'kg',
    2: 'lbs'
  };

  const distanceUnitMapping = {
    1: 'mi',
    2: 'km'
  };

  const getDistanceUnitNumber = (unit) => {
    return Object.keys(distanceUnitMapping).find(key => distanceUnitMapping[key] === unit);
  };

  const getHeightUnitNumber = (unit) => {
    return Object.keys(heightUnitMapping).find(key => heightUnitMapping[key] === unit);
  };

  const getWeightUnitNumber = (unit) => {
    return Object.keys(weightUnitMapping).find(key => weightUnitMapping[key] === unit);
  };

  const convertToUnit = (value) => {
    return distanceUnit === 'km' ? Math.floor(value * 1.609) : value;
  };

  const updateFightingStylePreference = (newPreference) => {
    setFightingStylePreference(newPreference);
  };

  const updateFightingLevelPreference = (newPreference) => {
    setFightingLevelPreference(newPreference);
  };

  const updateWeightClassPreference = (newPreference) => {
    setWeightRange(newPreference);
  };

  const convertPreferencesToNumbers = (selectedPreferences, mapping) => {
    // Handle the case where there's only one value
    const selectedPreferencesArray = selectedPreferences.includes(',') ? selectedPreferences.split(', ') : [selectedPreferences];

    const reverseMapping = Object.keys(mapping).reduce((acc, key) => {
      acc[mapping[key]] = parseInt(key, 10);
      return acc;
    }, {});

    const numbers = selectedPreferencesArray.map(preference => reverseMapping[preference]);
    return numbers.sort((a, b) => a - b);
  };

  // Sets the variables from data fetched fro the backend
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserPreferences(userId.userId);  // replace with the user's id
      if (data && data.age_range) {
        setAgeRange(data.age_range);
      }
      if (data && data.age_range) {
        setDistance(data.location_range);
      }
      if (data && data.fightingStyle) {
        const styleNames = data.fightingStyle.map(getFightingStyleName);
        setFightingStylePreference(styleNames.join(', '));
      }
      if (data && data.fightingLevel) {
        const levelNames = data.fightingLevel.map(getFightingLevelName);
        setFightingLevelPreference(levelNames.join(', '));
      }
      if (data && data.usersFightLevel) {
        setusersFightLevel(data.usersFightLevel);
      }
      // Need to calculate the user's weight class pref from weight_range
      if (data && data.weight_range) {
        const weightClassNames = data.weight_range.map(getWeightClassName);
        setWeightRange(weightClassNames.join(', '));
      }

      if (data && data.heightUnit !== undefined) {
        setHeightUnit(heightUnitMapping[data.heightUnit]);
        setOriginalHeightUnit(heightUnitMapping[data.heightUnit]);
        setHeight(data.actualHeight);
      }
      if (data && data.weightClass !== undefined) {
        setWeightClass(data.weightClass);
        setWeight(data.actualWeight);
        setOriginalWeightUnit(weightUnitMapping[data.weightUnit]);
      }
      if (data && data.weightUnit !== undefined) {
        setWeightUnit(weightUnitMapping[data.weightUnit]);
      }
      if (data && data.distanceUnit !== undefined) {
        setDistanceUnit(distanceUnitMapping[data.distanceUnit]);
      }

    };

    fetchData();
  }, []);

  return (
    <View>
      <Navbar
        handleSavePreferences={handleSavePreferences}
        backgroundColor="#000000"
        textColor="#FFFFFF"
        showBackButton={true}
        navigation={navigation}
        title="Settings"
        dataToUpdate={{
          userId: userId.userId,
          fightingStylePreference: convertPreferencesToNumbers(fightingStylePreference, fightingStyles),
          fightingLevelPreference: convertPreferencesToNumbers(fightingLevelPreference, fightingLevels),
          weightRange: convertPreferencesToNumbers(weightRange, weightClasses),
          distanceUnit: getDistanceUnitNumber(distanceUnit),
          originalHeightUnit: getHeightUnitNumber(originalHeightUnit),
          currentHeightUnit: getHeightUnitNumber(heightUnit),
          originalWeightUnit: getWeightUnitNumber(originalWeightUnit),
          currentWeightUnit: getWeightUnitNumber(weightUnit),
          originalHeight: height,
          originalWeight: weight,
          ageRange,
          distance,
        }}
        editProfile={false}
      />
      <ScrollView contentContainerStyle={settingsStyles.container}>

        <Text style={settingsStyles.fytrPlus}>Match unlimited Fytrs and elevate your fighting game with Fytr+</Text>

        <DividerTitle title="Preferences" />

        <SettingSection
          title="Fighting Style Preference(s)"
          onPress={() => navigation.navigate('PreferenceSel', {
            preferences: ['Boxing', 'Brazilian Jiu-Jitsu', 'Muay Thai', 'Wrestling', 'Kickboxing', 'Jiu-Jitsu', 'Judo', 'Karate', 'Kung Fu', 'Taekwondo'],
            title: 'What fighting styles do you want to match with',
            type: 'fightingStyle', // Pass the type
            currentPref: fightingStylePreference,
            updateFightingStylePreference: updateFightingStylePreference // Pass the function
          })}
          preference={fightingStylePreference}
          showChevron={true}
        />
        <SettingSection
          title="Fighting Level Preference(s)"
          onPress={() => navigation.navigate('PreferenceSel', {
            preferences: generateLevels(usersFightLevel, 'fightingLevel'),
            title: 'What fighting levels do you want to match with',
            type: 'fightingLevel', // Pass the type
            currentPref: fightingLevelPreference,
            updateFightingLevelPreference: updateFightingLevelPreference
          })}
          preference={fightingLevelPreference}
          showChevron={true}
        />

        <SettingSection title="Weight Class Preference(s)" onPress={() => navigation.navigate('PreferenceSel', {
          preferences: generateLevels(weightClass, 'weightClass'),
          title: 'What weight classes do you want to match with',
          // updatePreferences,
          type: 'weightClass', // Pass the type
          currentPref: weightRange,
          updateWeightClassPreference: updateWeightClassPreference,
        })}
          preference={weightRange}
          showChevron={true}
        />

        {/* Age slider */}
        <View style={settingsStyles.sectionContainer}>
          <View style={settingsStyles.titleAndValueContainer}>
            <Text style={settingsStyles.sectionTitle}>Age Preference</Text>
            <Text style={settingsStyles.sliderValue}>{`${ageRange[0]} - ${ageRange[1]}`}</Text>
          </View>
          {/* Slider Code */}
          <View style={settingsStyles.sliderContainer}>
            <MultiSlider
              values={ageRange}
              sliderLength={280}
              onValuesChange={ageRangeChange}
              min={18}
              max={60}
              step={1}
              containerStyle={settingsStyles.slider}
              selectedStyle={{ backgroundColor: 'black' }}
              trackStyle={settingsStyles.sliderTrack}
              markerStyle={settingsStyles.sliderMarker}
            />
          </View>
        </View>

        {/* Distance Slider & Title */}
        <View style={settingsStyles.sectionContainer}>
          <View style={settingsStyles.titleAndValueContainer}><Text style={settingsStyles.sectionTitle}>Distance</Text>
            <Text style={settingsStyles.sliderValue}>{`${convertToUnit(distance)} ${distanceUnit}`}</Text>


          </View>
          {/* Slider Code */}
          <View style={settingsStyles.sliderContainer}>
            <MultiSlider
              values={[convertToUnit(distance)]}
              sliderLength={280}
              onValuesChange={distanceChange}
              min={1}
              max={convertToUnit(50)}
              step={1}
              containerStyle={settingsStyles.slider}
              selectedStyle={{ backgroundColor: 'black' }}
              trackStyle={settingsStyles.sliderTrack}
              markerStyle={settingsStyles.sliderMarker}
            />

          </View>
        </View>

        {/* The rest of your sections and buttons will go here */}

        <DividerTitle title="Metrics" />

        {/* Weight and Height is connected, just need to do Distance */}
        <MetricsSection title="Height" option1="cm" option2="ft" selected={heightUnit} onSelect={setHeightUnit} />
        <MetricsSection title="Weight" option1="kg" option2="lbs" selected={weightUnit} onSelect={setWeightUnit} />
        <MetricsSection title="Distance" option1="mi" option2="km" selected={distanceUnit} onSelect={setDistanceUnit} />



        {/* <DividerTitle title="Ignore the buttons below" /> */}
        {/* <DividerTitle title="Blocks" /> */}
        {/* Gap between divider title and rectangle... investigate styling */}
        {/* <SettingSection onPress={() => navigation.navigate('BlockContactsScreen')} preference={"Block Contacts"} settingButton={true} />
        <SettingSection title="Blocked Users" onPress={() => navigation.navigate('BlockedUsersScreen')} settingButton={true} preference={"Blocked Users"} />

        <DividerTitle title="Notifications" />
        <SettingSection onPress={() => navigation.navigate('SomeScreen')} settingButton={true} preference={"Notification Settings"} />
        <DividerTitle title="Personal Details" />
        <SettingSection onPress={() => navigation.navigate('SomeScreen')} settingButton={true} preference={"Change Password"} />
        <SettingSection onPress={() => navigation.navigate('SomeScreen')} settingButton={true} preference={"Change Email"} />
        <SettingSection onPress={() => navigation.navigate('SomeScreen')} settingButton={true} preference={"Change Phone Number"} />
        <SettingSection onPress={() => navigation.navigate('SomeScreen')} settingButton={true} preference={"Manage Payment Account(s)"} />
        <DividerTitle title="Legal, Privacy & Support" />
        <SettingSection onPress={() => navigation.navigate('SomeScreen')} settingButton={true} preference={"Privacy Policy"} />
        <SettingSection onPress={() => navigation.navigate('SomeScreen')} settingButton={true} preference={"Privacy Preferences"} />
        <SettingSection onPress={() => navigation.navigate('SomeScreen')} settingButton={true} preference={"Cookie Policy"} />
        <SettingSection onPress={() => navigation.navigate('SomeScreen')} settingButton={true} preference={"Terms & Conditions"} />
        <SettingSection onPress={() => navigation.navigate('SomeScreen')} settingButton={true} preference={"Help & Support"} /> */}



      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
