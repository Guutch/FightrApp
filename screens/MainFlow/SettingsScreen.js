// screens/MainFlow/SettingsScreen.js
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Navbar from '../../components/Navbar';
import {settingsStyles, fightingStyleScreen} from '../../components/styles2'
import { fetchUserPreferences } from '../../api';  // update the path according to your project structure


// Need to fix this so that I can get the preferences to show
const SettingSection = ({ title, onPress, titleInsideRectangle = false, preference }) => {
  return (
    <View style={settingsStyles.sectionContainer}>
      {titleInsideRectangle ? null : <Text style={settingsStyles.sectionTitle}>{title}</Text>}
      <TouchableOpacity 
        style={[
          settingsStyles.sectionRectangle, 
          titleInsideRectangle ? {justifyContent: 'center', alignItems: 'center'} : null
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
  const [distanceUnit, setDistanceUnit] = useState('mi');
  const [fightingStylePreference, setFightingStylePreference] = useState('');  // Add this line
  const [fightingLevelPreference, setFightingLevelPreference] = useState('');  // Add this line
  // const [metricData, setMetricData] = useState({ heightUnit: '', weightUnit: '' });
// const [heightUnit, setHeightUnit] = useState('');
// const [weightUnit, setWeightUnit] = useState('');

  const distanceChange = (values) => setDistance(values[0]);
  // const 

  const ageRangeChange = (values) => {
    setAgeRange(values);
  };

  
  // const API_URL = 'http://10.0.2.2:3000';
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserPreferences('647f7dd72c6f64115221f611');  // replace with the user's id
      // const metricData = await ;
      
      console.log("data")
      console.log(data.age_range)
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

      if (data && data.heightUnit) {
        setHeightUnit(data.heightUnit);
      }
      if (data && data.weightUnit) {
        setWeightUnit(data.weightUnit);
      }

      // const data = await fetchUserPreferences('647f7dd72c6f64115221f611');  // replace with the user's id
      // if (data && data.age_range) {
      //   setAgeRange(data.age_range.map(range => parseInt(range['$numberInt'])));
      // }
    };

    fetchData();
  }, []);
  

  return (
    <View>
      <Navbar 
        backgroundColor="#000000" 
        textColor="#FFFFFF" 
        showBackButton={true} 
        navigation={navigation}  // Here we pass navigation as a prop to Navbar
        title="Settings"  // Here's the custom title
      />
      <ScrollView contentContainerStyle={settingsStyles.container}>
        
        <Text style={settingsStyles.fytrPlus}>Match unlimited Fytrs and elevate your fighting game with Fytr+</Text>
      
        <DividerTitle title="Preferences" />

{/* Simply just connects to FightingScreen, changes aren't saved
    and I need to connect changes to the backend etc */}
        <SettingSection 
    title="Fighting Style Preference(s)" 
    onPress={() => navigation.navigate('FightingScreen', { 
        userPreferences: fightingStylePreference, 
        isUpdate: true 
    })} 
    preference={fightingStylePreference} 
/>
{/* Need to connect this to FightingLevel
    Need changes to also be saved too */}
<SettingSection title="Fighting Level Preference(s)" onPress={() => navigation.navigate('FightingLevel')} preference={fightingLevelPreference} />
<SettingSection title="Weight Class Preference(s)" onPress={() => navigation.navigate('WeightClass')} />
        
        <View style={settingsStyles.sectionContainer}>
        <View style={settingsStyles.titleAndValueContainer}>
  <Text style={settingsStyles.sectionTitle}>Age Preference</Text>
  <Text style={settingsStyles.sliderValue}>{`${ageRange[0]} - ${ageRange[1]}`}</Text>
</View>
<View style={settingsStyles.sliderContainer}>
<MultiSlider
  values={ageRange}
  sliderLength={280}
  // onValuesChange={ageRangeChange}
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
        
        <View style={settingsStyles.sectionContainer}>
          <View style={settingsStyles.titleAndValueContainer}><Text style={settingsStyles.sectionTitle}>Distance</Text>
          <Text style={settingsStyles.sliderValue}>{`${distance} miles`}</Text>
          </View>
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
<SettingSection title="Block Contacts" onPress={() => navigation.navigate('BlockContactsScreen')} titleInsideRectangle={true} />
<SettingSection title="Blocked Users" onPress={() => navigation.navigate('BlockedUsersScreen')} titleInsideRectangle={true} />

<DividerTitle title="Notifications" />
<SettingSection title="Notification Settings" onPress={() => navigation.navigate('SomeScreen')} titleInsideRectangle={true} />

<DividerTitle title="Personal Details" />
<SettingSection title="Change Password" onPress={() => navigation.navigate('SomeScreen')} titleInsideRectangle={true} />    
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
