// Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navbarStyles } from '../components/styles2';
import { changeUserPreferences, updateEditProfileData } from '../api'

const Navbar = ({
    navigation,
    showBackButton,
    showNextButton,
    onNext,
    homeStyle,
    backgroundColor,
    textColor,
    title = "Fytr",
    dataToUpdate,
    handleBackPressPrefSel,
    handleSavePreferences,
    editProfile
  }) => {

    const validateHeight = () => {
      if (dataToUpdate.heightUnit === "cm") {
        return dataToUpdate.height >= 140 && dataToUpdate.height <= 210;
      } else {
        // const totalHeightInInches = (dataToUpdate.heightFt * 12) + dataToUpdate.heightInch;
        if(dataToUpdate.heightFt > 7 || dataToUpdate.heightFt < 4) {
          return false;
        }
        if(dataToUpdate.heightInch > 11 || dataToUpdate.heightInch < 0) {
          return false;
        }
        return true;
      }
    }
    
    
    const validateWeight = () => {
      if (dataToUpdate.weightUnit === "kg") {
        return dataToUpdate.weight <= 600;
      } else { // Assuming the other unit is lbs
        return dataToUpdate.weight <= 1323;
      }
    };

    const transformHeight = (data) => {
      if (data.heightUnit === "ft") {
        return parseInt(data.heightFt) * 12 + parseInt(data.heightInch);
      }
      return parseInt(data.height); // assuming height is in string format, if not, you can skip parseInt
    };
    
    const constructPayload = (data) => {
      return {
        bio: data.bio,
        fightingStyles: data.fightingStyles,
        weight: data.weight,
        height: transformHeight(data),
        weightClass: data.weightClass
      };
    };
    

    const handleBackPress = async () => {
      // Call the handleSavePreferences function to update preferences in the Redux store
      // Alert.alert("ROgan Josh")
      // console.log(editProfile)
      if(editProfile) {
        if (!validateWeight()) {
          Alert.alert("Invalid Weight", "Please enter a Weight within the acceptable range.");
          return;
        }
        if (!validateHeight()) {
          Alert.alert("Invalid Height", "Please enter a height within the acceptable range.");
          return;
        }
        const cleanedData = constructPayload(dataToUpdate);
updateEditProfileData(dataToUpdate.userId, cleanedData);

      } else {
        console.log("lmaolmaolmao")
        handleSavePreferences(dataToUpdate);
  
        // Update preferences in the backend
        await changeUserPreferences(dataToUpdate.userId, dataToUpdate);
      }

      // Navigate back
      navigation.goBack();
    };

    return (
      <View style={[navbarStyles.banner, { backgroundColor }]}>
        {homeStyle ? (
          <>
            <Text
              style={[navbarStyles.fightrText, navbarStyles.backButton, { color: textColor }]}>
              {title}
            </Text>
            <View style={navbarStyles.iconContainer}>
  <TouchableOpacity style={[navbarStyles.homeNextButton, { marginRight: 15 }]} onPress={() => navigation.navigate('SomeScreen')}>
    <Icon name="bell" size={navbarStyles.iconSize.width} color={textColor} />
  </TouchableOpacity>
  <TouchableOpacity style={navbarStyles.homeNextButton} onPress={() => navigation.navigate('SettingsScreen')}>
    <Icon name="cog" size={navbarStyles.iconSize.width} color={textColor} />
  </TouchableOpacity>
</View>

            
          </>
        ) : (
          <>
            {showBackButton && !dataToUpdate && (
      <TouchableOpacity
        style={navbarStyles.backButton}
        onPress={handleBackPressPrefSel || (() => navigation.goBack())} // Use the custom handler if provided, otherwise use the default behavior
      >
        <Icon name="arrow-left" size={navbarStyles.iconSize.width} color={textColor} />
      </TouchableOpacity>
    )}
            {showBackButton && dataToUpdate && (
              <TouchableOpacity
              style={navbarStyles.backButton}
              onPress={handleBackPress}
            >
              <Icon name="arrow-left" size={navbarStyles.iconSize.width} color={textColor} />
            </TouchableOpacity>
            )}
            <Text style={[navbarStyles.fightrText, { color: textColor }]}>{title}</Text>
            {showNextButton && (
              <TouchableOpacity style={navbarStyles.nextButton} onPress={onNext}>
                <Icon name="check" size={navbarStyles.iconSize.width} color={textColor} />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    );
  };
  export default Navbar;