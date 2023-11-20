// Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navbarStyles, matchedUsersInterface } from '../components/styles2';
import { changeUserPreferences, changePhotoPositions, updateEditProfileData, updateFightingLevelPref, handlePhotos, handleWeightChange } from '../api'
import { useDispatch } from 'react-redux';
import { updateWeight } from '../redux/actions';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';


const Navbar = ({
  navigation,
  showBackButton,
  showNextButton,
  onNext,
  homeStyle,
  backgroundColor,
  textColor,
  title,
  dataToUpdate,
  handleBackPressPrefSel,
  handleSavePreferences,
  handleSaveFightingLevel,
  editProfile,
  showLockIcon = false,
  onLockPress,
  onBackPressCustom
}) => {

  const screenWidth = Dimensions.get('window').width;
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();


  const validateHeight = () => {
    if (dataToUpdate.heightUnit === "cm") {
      return dataToUpdate.height >= 100 && dataToUpdate.height <= 210;
    } else {
      // const totalHeightInInches = (dataToUpdate.heightFt * 12) + dataToUpdate.heightInch;
      if (dataToUpdate.heightFt > 7 || dataToUpdate.heightFt < 4) {
        return false;
      }
      if (dataToUpdate.heightInch > 11 || dataToUpdate.heightInch < 0) {
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
      fightingLevel: Number(data.fightingLevel),
      weight: data.weight,
      height: transformHeight(data),
      weightClass: data.weightClass
    };
  };


  const constructImagesPayload = (data) => {
    return {
      newImages: data.newlyUploadedPhotos,
      deletedImages: data.deletedPhotos
    };
  }




  const handleBackPress = async () => {


    // Call the handleSavePreferences function to update preferences in the Redux store
    if (editProfile) {
      if (!validateWeight()) {
        Alert.alert("Invalid Weight", "Please enter a Weight within the acceptable range.");
        return;
      }
      if (!validateHeight()) {
        Alert.alert("Invalid Height", "Please enter a height within the acceptable range.");
        return;
      }

      // fightingLevel: Number(dataToUpdate.fightingLevel)
      const hasFightingLevelChanged = Number(dataToUpdate.fightingLevel) !== dataToUpdate.originalFightingLevel;
      if (hasFightingLevelChanged) {
        // Call api.js - Change fighting level preference
        handleSaveFightingLevel(Number(dataToUpdate.fightingLevel))
        updateFightingLevelPref(dataToUpdate.userId, dataToUpdate.fightingLevel);
      }


      const hasWeightChanged = Number(dataToUpdate.weight) !== dataToUpdate.originalWeight;
      if (hasWeightChanged) {
        // Need to dispatch the change
        dispatch(updateWeight(dataToUpdate.userId, dataToUpdate.weightClass))
        // Need to update weight_range preference
        // Can call users.js
        handleWeightChange(dataToUpdate.userId, dataToUpdate.weightClass, dataToUpdate.userSex)
      } 

      const cleanedData = constructPayload(dataToUpdate);
      updateEditProfileData(dataToUpdate.userId, cleanedData);

      if (dataToUpdate.changedPhotos !== null) {
        console.log(dataToUpdate.changedPhotos.length)
        await changePhotoPositions(dataToUpdate.changedPhotos)
      }

      const cleanedPhotos = constructImagesPayload(dataToUpdate);
      // console.log("New Photo(s)", cleanedPhotos.newImages)
      handlePhotos(dataToUpdate.userId, cleanedPhotos)


    } else {
      console.log("lmaolmaolmao")
      handleSavePreferences(dataToUpdate);


      // // Update preferences in the backend
      await changeUserPreferences(dataToUpdate.userId, dataToUpdate);
    }
    // Navigate back
    console.log("lol")
    navigation.goBack();
  };


  return (
    <View style={[navbarStyles.banner, { backgroundColor, paddingTop: insets.top }]}>
      {homeStyle ? (
        <>
          {title ? (
            <Text style={[navbarStyles.fightrText, navbarStyles.backButton, { color: textColor, paddingTop: insets.top }]}>
              {title}
            </Text>
          ) : (
            <View style={{ paddingTop: insets.top, position: 'absolute', left: screenWidth * 0.05 }}>
              <Image
                source={require('../assets/WhiteBack.png')} // Ensure this path is correct
                style={[navbarStyles.logoStyle]}
              />
            </View>
          )}
          <View style={[navbarStyles.iconContainer, { paddingTop: insets.top }]}>
            {/* Notification bell */}
            {/* <TouchableOpacity style={[navbarStyles.homeNextButton, { marginRight: 15 }]} onPress={() => navigation.navigate('NotificationScreen')}>
<Icon name="bell" size={navbarStyles.iconSize.width} color={textColor} />
<View style={matchedUsersInterface.redDot}></View>
</TouchableOpacity> */}
            <TouchableOpacity style={navbarStyles.homeNextButton} onPress={() => navigation.navigate('SettingsScreen')}>
              <Icon name="cog" size={navbarStyles.iconSize.width} color={textColor} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {showBackButton && !dataToUpdate && !onBackPressCustom && (
            <TouchableOpacity
              style={[navbarStyles.backButton, { paddingTop: insets.top }]}
              onPress={handleBackPressPrefSel || (() => navigation.goBack())} // Use the custom handler if provided, otherwise use the default behavior
            >
              <Icon name="arrow-left" size={navbarStyles.iconSize.width} color={textColor} />
            </TouchableOpacity>
          )}
          {showBackButton && !dataToUpdate && onBackPressCustom && (
            <TouchableOpacity
              style={[navbarStyles.backButton, { paddingTop: insets.top }]}
              onPress={onBackPressCustom}
            >
              <Icon name="arrow-left" size={navbarStyles.iconSize.width} color={textColor} />
            </TouchableOpacity>
          )}
          {showBackButton && dataToUpdate && (
            <TouchableOpacity
              style={[navbarStyles.backButton, { paddingTop: insets.top }]}
              onPress={handleBackPress}
            >
              <Icon name="arrow-left" size={navbarStyles.iconSize.width} color={textColor} />
            </TouchableOpacity>
          )}
          {
            title ? (
              <Text style={[navbarStyles.fightrText, { color: textColor }]}>
                {title}
              </Text>
            ) : (
              <Image
                source={require('../assets/BlackBack.png')} // make sure this path is correct
                style={navbarStyles.logoStyle}
              />
            )
          }
          {showNextButton && (
            <TouchableOpacity
              style={[navbarStyles.nextButton, { paddingTop: insets.top }]}
              onPress={onNext}
            >
              <Icon name="check" size={navbarStyles.iconSize.width} color={textColor} />
            </TouchableOpacity>
          )}
          {showLockIcon && (
            <TouchableOpacity
              style={[navbarStyles.nextButton, { paddingTop: insets.top }]}
              onPress={onLockPress}
            >
              <Icon name="lock" size={navbarStyles.iconSize.width} color={textColor} />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};
export default Navbar;