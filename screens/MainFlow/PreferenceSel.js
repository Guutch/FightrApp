// PreferenceSel.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity , ScrollView} from 'react-native';
import Navbar from '../../components/Navbar';
import { fightingStyleScreen, firstNameScreen } from '../../components/styles2';

const CheckBox = ({ isChecked, onToggle }) => (
    <TouchableOpacity
      style={[fightingStyleScreen.checkBox, isChecked && fightingStyleScreen.checked]}
      onPress={onToggle}
    />
  );

  const PreferenceSel = ({ navigation, route }) => {
    const { preferences, title, currentPref } = route.params;
    
    // Use currentPref to set the initial value of checkedItems
    const [checkedItems, setCheckedItems] = useState(currentPref);
  
    const toggleCheckbox = (item) => {
      if (checkedItems.includes(item)) {
        setCheckedItems(checkedItems.filter(i => i !== item));
      } else {
        setCheckedItems([...checkedItems, item]);
      }
    };
  
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
        />
  <ScrollView contentContainerStyle={fightingStyleScreen.list}>
        <Text style={firstNameScreen.questionText}>{title}</Text>
        {preferences.map(renderItem)}
        </ScrollView>
      </View>
    );
  };

export default PreferenceSel;
