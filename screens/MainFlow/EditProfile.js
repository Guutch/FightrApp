import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Alert, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Navbar from '../../components/Navbar';
import { settingsStyles, welcomeStyles, fightingStyleScreen } from '../../components/styles2';
import SettingSection from '../../components/SettingSection';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import PhotoSelector from '../../components/PhotoSelector';
import TextEditProf from '../../components/TextEditProf';
import BioInput from '../../components/BioInput';
import { fetchEditProfileData, fetchImages } from '../../api';
import { useSelector } from 'react-redux';

const EditProfileScreen = ({ navigation, route }) => {
  const [userSex, setuserSex] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [heightUnit, setHeightUnit] = useState('');
  const [weightUnit, setWeightUnit] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [weightClass, setWeightClass] = useState('');
  const [fightingLevel, setFightingLevel] = useState('');
  const [fightingStyle, setFightingStyle] = useState('');
  const [value, onChangeText] = useState('');
  const [images, setImages] = useState(Array(6).fill(null));
  const nextIndex = useRef(0);

  const { usersName } = route.params;

  const userId = useSelector(state => state.user);  // Gets the userId from the Redux state

  const requestCameraRollPermissions = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (result === RESULTS.GRANTED) {
        return true;
      } else {
        alert('Sorry, we need camera roll permissions to make this work!');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
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

  const weightUnitMapping = {
    1: 'kg',
    2: 'lbs'
  };

  const heightUnitMapping = {
    1: 'cm',
    2: 'ft'
  };

  // Used for when the user changes their weight
  const getWeightClass = (weight, weightUnit, sex) => {
    // Convert weight to lbs if it's in kg
    // if (weightUnit === 1) {
    //   weight = weight * 2.20462; // 1 kg is approximately 2.20462 lbs
    // }
  
    let weightClass = 0;
  
    if (sex === 2) { // if sex is female
      if (weight <= 115) weightClass = 1;
      else if (weight <= 125) weightClass = 2;
      else if (weight <= 135) weightClass = 3;
      else weightClass = 4; // Featherweight for all women above 135lbs
    } else { // if sex is male
      if (weight <= 115) weightClass = 1;
      else if (weight <= 125) weightClass = 2;
      else if (weight <= 135) weightClass = 3;
      else if (weight <= 145) weightClass = 4;
      else if (weight <= 155) weightClass = 5;
      else if (weight <= 170) weightClass = 6;
      else if (weight <= 185) weightClass = 7;
      else if (weight <= 205) weightClass = 8;
      else weightClass = 9; // Heavyweight for all men above 205lbs
    }
  
    return weightClass;
  };

  const handleWeightChange = (newWeight) => {
    // Convert weight to lbs if it's in kg
    if (weightUnit === "kg") {
      newWeight = newWeight * 2.20462; // 1 kg is approximately 2.20462 lbs
    }
    console.log("newWeight", newWeight)
    console.log("weightUnit", weightUnit)
    console.log("sex", userSex)
  
    // Calculate the new weight class
    const newWeightClass = getWeightClass(newWeight, weightUnit, userSex);
  
    // Update the weight class state
    setWeightClass(newWeightClass);
  
    // Console log for debugging
    console.log("New weight class:", newWeightClass);
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

  const selectPhoto = async (index) => {

    console.log("Just pressed on grey box", nextIndex.current);

    if (index !== nextIndex.current) {
      console.log(index);
      console.log(nextIndex.current);
    
      Alert.alert("Please select photos in order");
      return;
    }
    

    const hasPermission = await requestCameraRollPermissions();
    if (!hasPermission) {
      return;
    }

    const options = {
      mediaType: 'photo',
      width: 1000,
      height: 1000,
      cropping: true,
      includeBase64: Platform.OS === 'android',
    };

    ImagePicker.openPicker(options)
      .then(async (response) => {
        // console.log('Selected photo path:', response.path);

        // Already 'been selected' code
        if (Platform.OS === 'android') {
          for (const image of images) {
            if (image && image.data === response.data) {
              alert('This photo has already been selected. Please choose a different photo.');
              return;
            }
          }
        } else {
          if (images.some((image) => image && image.path === response.path)) {
            alert('This photo has already been selected. Please choose a different photo.');
            return;
          }
        }

        const newImages = [...images];
        newImages[index] = { path: response.path, data: response.data, name: response.path.split("/").pop(), type: 'image/jpeg', position: index + 1 };
        setImages(newImages);
        nextIndex.current = nextIndex.current + 1;


        // setImagePaths((prevPaths) => [...prevPaths, response.path]);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const removePhoto = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1); // Remove the image at the given index
      updatedImages.push(null); // Add a null value at the end to keep the array length consistent
  
      // Update positions of the images if needed
      for (let i = 0; i < updatedImages.length; i++) {
        if (updatedImages[i] !== null) {
          updatedImages[i].position = i + 1;
        }
      }
  
      return updatedImages;
    });
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEditProfileData(userId.userId);
      console.log("lmaodsdsdsds")
      console.log(data);

      const userImages = await fetchImages(userId.userId);
userImages.sort((a, b) => a.position - b.position);

// Map the user images to rename 'url' to 'path'
const normalizedUserImages = userImages.map(image => ({
  ...image,
  path: image.url, // Rename 'url' to 'path'
}));

// Create a new array of length 6, filling it with normalized user images and null for remaining spaces
const newImagesArray = Array(6).fill(null).map((_, index) => normalizedUserImages[index] || null);

setImages(newImagesArray);


      requestCameraRollPermissions();

      nextIndex.current = images.filter((image) => image !== null).length;

      // // Will need API (Google maps/OSM) to convert from coordinates to city/town
      // if (data && data.location) {
      //     setLocation(data.location)
      //     console.log(location)
      // }

      if (data) {
        setuserSex(data.usersSex);
        setBio(data.usersBio);
        // console.log(data.usersBio)
        setWeightUnit(weightUnitMapping[data.weightUnit]);
        setHeightUnit(heightUnitMapping[data.heightUnit]);
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

        <Text style={[settingsStyles.sectionTitle, { marginVertical: 10 }]}>Photos</Text>

        <PhotoSelector
          images={images}
          selectPhoto={selectPhoto}
          removePhoto={removePhoto}
          isEditProfile={true}
          useUrl={true}
        // styles={styles} // If you're passing styles as a prop
        />

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
        {heightUnit === "ft" && (
  <>
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <TextEditProf
        title="Height (ft)"
        value={Math.floor(height / 12)} // You may want to pass the calculated feet value here
        isHeightFeet={true}
      />
      <TextEditProf
        title='Height (")'
        value={height % 12} // You may want to pass the calculated inches value here
        isHeightFeet={true}
      />
    </View>
  </>
)}
{heightUnit === "cm" && (
  <TextEditProf
    title="Height (cm)"
    value={height} // You may want to convert inches to cm here
  />
)}
        {/* <TextEditProf title={`Height (${heightUnit})`} value={height} showChevron={true}></TextEditProf> */}
        <TextEditProf title={`Weight (${weightUnit})`} value={weight} showChevron={true} onWeightChange={handleWeightChange} />

        <SettingSection title="Weight Class" onPress={() => navigation.navigate('SomeScreen')} preference={getWeightClassName(weightClass)} />

        {/* <SettingSection title="Years Experience" onPress={() => navigation.navigate('SomeScreen')} /> */}
        <Text style={settingsStyles.sectionTitle}>Bio</Text>
        <BioInput bio={bio}></BioInput>
      </ScrollView>


    </View>
  );
};

export default EditProfileScreen;
