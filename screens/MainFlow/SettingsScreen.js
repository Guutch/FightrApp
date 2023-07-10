// screens/MainFlow/SettingsScreen.js
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Navbar from '../../components/Navbar';
import { settingsStyles, fightingStyleScreen } from '../../components/styles2'
import { fetchUserPreferences } from '../../api';  // update the path according to your project structure
import { useSelector } from 'react-redux';

// Need to fix this so that I can get the preferences to show
const SettingSection = ({ title, onPress, titleInsideRectangle = false, preference }) => {
  return (
    <View style={settingsStyles.sectionContainer}>
      {titleInsideRectangle ? null : <Text style={settingsStyles.sectionTitle}>{title}</Text>}
      <TouchableOpacity
        style={[
          settingsStyles.sectionRectangle,
          titleInsideRectangle ? { justifyContent: 'center', alignItems: 'center' } : null
        ]}
        onPress={onPress}
      >
        {titleInsideRectangle ?
          <Text style={[settingsStyles.sectionTitle, fightingStyleScreen.rectangleText]}>{title}</Text>
          : null
        }
        {preference ?
          <Text style={settingsStyles.preferenceText}>{preference}</Text>
          : <Text style={settingsStyles.preferenceText}>Loading...</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

// Need to investigate this. Particularly for the other settings
const DividerTitle = ({ title }) => {
  return (
    <Text style={settingsStyles.dividerTitle}>{title}</Text>
  );
};


const MetricsSection = ({ title, option1, option2, selected, onSelect }) => {
  return (
    <View style={settingsStyles.metricsMargin}>


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
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [distanceUnit, setDistanceUnit] = useState('');
  const [fightingStylePreference, setFightingStylePreference] = useState('');  // Add this line
  const [fightingLevelPreference, setFightingLevelPreference] = useState('');  // Add this line
  const [usersFightLevel, setusersFightLevel] = useState('');  // Add this line
  const [availableClasses, setavailableClasses] = useState('');
  const [weightRange, setWeightRange] = useState("");
  const userId = useSelector(state => state.user);  // Gets the userId from the Redux state
  // console.log('Settings - User ID is:', userId.userId);
  // const [metricData, setMetricData] = useState({ heightUnit: '', weightUnit: '' });
  // const [heightUnit, setHeightUnit] = useState('');
  // const [weightUnit, setWeightUnit] = useState('');

  const distanceChange = (values) => setDistance(values[0]);

  const ageRangeChange = (values) => {
    setAgeRange(values);
  };

  // List of all weight classes in lbs
  const weightClasses = [
    { name: "Strawweight", range: [0, 115] },
    { name: "Flyweight", range: [116, 125] },
    { name: "Bantamweight", range: [126, 135] },
    { name: "Featherweight", range: [136, 145] },
    { name: "Lightweight", range: [146, 155] },
    { name: "Welterweight", range: [156, 170] },
    { name: "Middleweight", range: [171, 185] },
    { name: "Light Heavyweight", range: [186, 205] },
    { name: "Heavyweight", range: [206, 999] },
  ];

  // Populate Weight Class SettingSection
  const getWeightClassPreferences = (weightRange) => {
    // Deconstruct weightRange into its lower and upper bounds
    const [lowerBound, upperBound] = weightRange;

    // Filter weightClasses array to only include classes within the user's weight range
    const eligibleWeightClasses = weightClasses.filter(({ range }) => {
      const [classLowerBound, classUpperBound] = range;
      // modify the condition to include classes where the lower bound is equal or larger than the lower bound of the weight range
      // and the upper bound of the class is less or equal to the upper bound of the weight range + 1.
      // This is to accommodate for the situation where the upper bound of the weight range might be at a lower end of a weight class.
      return (classLowerBound >= lowerBound && classUpperBound <= upperBound + 1);
    });

    // Return only the names of the eligible weight classes
    return eligibleWeightClasses.map(({ name }) => name);
  }

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
  const generateLevels = (currentLevel) => {
    const allLevels = ['Professional', 'Amateur Competitor', 'Advanced', 'Intermediate', 'Beginner', 'Novice'];
    const levelIndex = allLevels.indexOf(currentLevel);

    // Check for edge cases
    if (levelIndex === 0) {  // If user is a 'Professional'
      return allLevels.slice(0, 2);
    } else if (levelIndex === allLevels.length - 1) {  // If user is a 'Novice'
      return allLevels.slice(-2);
    } else {  // All other cases
      return allLevels.slice(levelIndex - 1, levelIndex + 2);
    }
  }

  // Sets the variables from data fetched fro the backend
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserPreferences(userId.userId);  // replace with the user's id
      // const metricData = await ;



      console.log("data")
      console.log(data)
      if (data && data.age_range) {
        setAgeRange(data.age_range);
      }
      if (data && data.age_range) {
        setDistance(data.location_range);
      }
      if (data && data.fightingStyle) {
        setFightingStylePreference(data.fightingStyle.join(', '));
      }
      if (data && data.fightingLevel) {
        setFightingLevelPreference(data.fightingLevel.join(', '));
      }
      if (data && data.usersFightLevel) {
        setusersFightLevel(data.usersFightLevel);
      }
      // Need to calculate the user's weight class pref from weight_range
      if (data && data.weight_range) {
        const weightClassNames = getWeightClassPreferences(data.weight_range);
        setWeightRange(weightClassNames.join(', '));
        const availableClasses = getUserWeightClasses(data.weight);
        // console.log("availableClasses");
        console.log(weightRange);
        setavailableClasses(availableClasses)
      }
      // Previous solution
      // if (data && data.weight) {
      //   const userWeight = data.weight;
      //   console.log(userWeight)
      //   const weightClassNames = getUserWeightClasses(userWeight);
      //   setweightPreference(weightClassNames.join(', '));
      // }



      if (data && data.heightUnit) {
        setHeightUnit(data.heightUnit);
      }
      if (data && data.weightUnit) {
        setWeightUnit(data.weightUnit);
      }

    };

    fetchData();
  }, []);


  return (
    <View>
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        showBackButton={true}
        navigation={navigation}
        title="Settings"
        dataToUpdate={{
          userId: userId.userId,
          fightingStylePreference,
          fightingLevelPreference,
          weightUnit,
          heightUnit,
          ageRange,
          distance,
        }}
      />
      <ScrollView contentContainerStyle={settingsStyles.container}>

        <Text style={settingsStyles.fytrPlus}>Match unlimited Fytrs and elevate your fighting game with Fytr+</Text>

        <DividerTitle title="Preferences" />

        {/* Simply just connects to FightingScreen, changes aren't saved
    and I need to connect changes to the backend etc */}
        <SettingSection
          title="Fighting Style Preference(s)"
          onPress={() => navigation.navigate('PreferenceSel', {
            preferences: ['Boxing', 'Brazilian Jiu-Jitsu', 'Muay Thai', 'Wrestling', 'Kickboxing', 'Jiu-Jitsu', 'Judo', 'Karate', 'Kung Fu', 'Taekwondo'],
            title: 'What fighting styles do you want to match with',
            currentPref: fightingStylePreference
          })}
          preference={fightingStylePreference}
        />
        {/* Need to connect this to FightingLevel
    Need changes to also be saved too */}
        <SettingSection
          title="Fighting Level Preference(s)"
          onPress={() => navigation.navigate('PreferenceSel', {
            preferences: generateLevels(usersFightLevel),
            title: 'What fighting levels do you want to match with',
            currentPref: fightingLevelPreference
          })}
          preference={fightingLevelPreference}
        />
        <SettingSection title="Weight Class Preference(s)" onPress={() => navigation.navigate('PreferenceSel', {
          preferences: availableClasses,
          title: 'What weight classes do you want to match with',         
          currentPref: weightRange
        })} preference={weightRange} />

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
            <Text style={settingsStyles.sliderValue}>{`${distance} miles`}</Text>
          </View>
          {/* Slider Code */}
          <View style={settingsStyles.sliderContainer}>
            <MultiSlider
              values={[distance]}
              sliderLength={280}
              onValuesChange={distanceChange}
              min={1}
              max={50}
              step={1}
              containerStyle={settingsStyles.slider}
              selectedStyle={{ backgroundColor: 'black' }} // Add this line
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

        <DividerTitle title="Blocks" />
        {/* Gap between divider title and rectangle... investigate styling */}
        <SettingSection onPress={() => navigation.navigate('BlockContactsScreen')} preference={"Block Contacts"} />
        <SettingSection title="Blocked Users" onPress={() => navigation.navigate('BlockedUsersScreen')} titleInsideRectangle={true} />

        <DividerTitle title="Notifications" />
        <SettingSection title="Notification Settings" onPress={() => navigation.navigate('SomeScreen')} titleInsideRectangle={true} />

        <DividerTitle title="Personal Details" />
        <SettingSection onPress={() => navigation.navigate('SomeScreen')} preference={"Change Password"} />
        <SettingSection title="Change Email" onPress={() => navigation.navigate('SomeScreen')} titleInsideRectangle={true} />
        <SettingSection title="Change Phone Number" onPress={() => navigation.navigate('SomeScreen')} titleInsideRectangle={true} />
        <SettingSection title="Manage Payment Account(s)" onPress={() => navigation.navigate('SomeScreen')} titleInsideRectangle={true} />

        <DividerTitle title="Legal, Privacy & Support" />
        <SettingSection title="Privacy Policy" onPress={() => navigation.navigate('SomeScreen')} titleInsideRectangle={true} />
        <SettingSection title="Privacy Preferences" onPress={() => navigation.navigate('SomeScreen')} titleInsideRectangle={true} />
        <SettingSection title="Cookie Policy" onPress={() => navigation.navigate('SomeScreen')} titleInsideRectangle={true} />
        <SettingSection title="Terms & Conditions" onPress={() => navigation.navigate('SomeScreen')} titleInsideRectangle={true} />
        <SettingSection title="Help & Support" onPress={() => navigation.navigate('SomeScreen')} titleInsideRectangle={true} />



      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
