// PreferenceSel.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Navbar from '../../components/Navbar';
import { fightingStyleScreen, firstNameScreen } from '../../components/styles2';

const CheckBox = ({ isChecked, onToggle }) => (
  <TouchableOpacity
    style={[fightingStyleScreen.checkBox, isChecked && fightingStyleScreen.checked]}
    onPress={onToggle}
  />
);

const PreferenceSel = ({ navigation, route }) => {
  const { preferences, title, currentPref, type } = route.params;

  // Split currentPref by ', ' to get the initial value of checkedItems
  const initialCheckedItems = type === 'fightingLevelEdit' ? currentPref : (currentPref ? currentPref.split(', ') : []);
  const [checkedItems, setCheckedItems] = useState(initialCheckedItems);

  const handleBackPressPrefSel = () => {
    if (checkedItems.length === 0) {
      alert('Please select at least one preference.');
    } else {
      const { type, updateFightingStylePreference, updateFightingLevelPreference, updateWeightClassPreference, updateFightingLevel, updateFightingStyle } = route.params;

      switch (type) {
        case 'fightingStyle':
          updateFightingStylePreference(checkedItems.join(', '));
          console.log(checkedItems)
          break;
        case 'fightingStyleEdit':
          updateFightingStyle(checkedItems.join(', '));
          console.log(checkedItems)
          break;
        case 'fightingLevel':
          updateFightingLevelPreference(checkedItems.join(', '));
          break;
        case 'fightingLevelEdit':
          updateFightingLevel(checkedItems); // No need to join
          break;
        case 'weightClass':
          updateWeightClassPreference(checkedItems.join(', '));
          break;

        default:
          console.warn('Unknown preference type:', type);
      }

      navigation.goBack();
    }
  };



  const toggleCheckbox = (item) => {

    if (type === 'fightingLevelEdit') {
      setCheckedItems(item); // Single selection
    } else {
      if (title === 'What do you want to match with' || title==='What are your combat sports' ) {
        // Show an alert or some other indication to the user
        if (checkedItems.length >= 3 && !checkedItems.includes(item)) {
          console.log("BIG BOSH")
          alert('You cannot select more than 3 fighting styles.');
          return;
        }

      }

      if (checkedItems.includes(item)) {
        setCheckedItems(checkedItems.filter(i => i !== item));
      } else {
        setCheckedItems([...checkedItems, item]);
      }
    };
  }


  const renderItem = (item, index) => (
    <View
      style={[
        fightingStyleScreen.rectangle,
        index === 0 ? fightingStyleScreen.firstRectangle : {},
      ]}
      key={item}
    >
      <Text style={[fightingStyleScreen.textStyle, fightingStyleScreen.rectangleText]}>
        {item}
      </Text>
      <CheckBox isChecked={checkedItems.includes(item)} onToggle={() => toggleCheckbox(item)} />
    </View>
  );

  return (
    <View style={fightingStyleScreen.container}>
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        navigation={navigation}
        showBackButton={true}
        handleBackPressPrefSel={handleBackPressPrefSel} // Pass the custom handler
      />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={fightingStyleScreen.listPrefSel}>
        <Text style={[fightingStyleScreen.questionText, {paddingTop: 30}]}>
          {title}
        </Text>
        {preferences.map(renderItem)}
      </ScrollView>
    </View>
  );


};

export default PreferenceSel;
