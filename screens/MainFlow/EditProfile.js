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
import { useDispatch, useSelector } from 'react-redux';
import { updateFightingLevelEdit } from '../../redux/actions';



const EditProfileScreen = ({ navigation, route }) => {
  const [userSex, setuserSex] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [heightUnit, setHeightUnit] = useState('');
  const [weightUnit, setWeightUnit] = useState('');
  const [height, setHeight] = useState('');
  const [heightFt, setHeightFt] = useState(0);
  const [heightInch, setHeightInch] = useState(0);
  const [weight, setWeight] = useState('');
  const [weightClass, setWeightClass] = useState('');
  const [fightingLevel, setFightingLevel] = useState(0);
  const [originalFightingLevel, setOriginalFightingLevel] = useState(0);
  const [fightingStyle, setFightingStyle] = useState('');
  const [value, onChangeText] = useState('');
  const [images, setImages] = useState(Array(6).fill(null));
  const [newlyUploadedPhotos, setNewlyUploadedPhotos] = useState([]);
  const [deletedPhotos, setDeletedPhotos] = useState([]);
  const [changedPhotosState, setChangedPhotosState] = useState([]);

  const nextIndex = useRef(0);

  const { usersName } = route.params;

  const userId = useSelector(state => state.user);  // Gets the userId from the Redux state

  const dispatch = useDispatch();

  const handleBioChange = (newBio) => {
    setBio(newBio);
  };

  const handleHeightChange = (value, type) => {
    if (heightUnit === "cm") {
      setHeight(value);
    } else {
      if (type === "ft") {
        setHeightFt(value);
      } else if (type === "inch") {
        setHeightInch(value);
      }
    }
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
    setWeight(newWeight);

    // Console log for debugging
    console.log("New weight class:", newWeightClass);
  };

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




  const getKeyByValue = (object, value) => {
    const entry = Object.entries(object).find(([key, val]) => val === value);
    return entry ? entry[0] : null;
  };

  const updateFightingLevel = (newLevel) => {
    const keyForNewLevel = getKeyByValue(fightingLevels, newLevel);
    console.log("keyForNewLevel", keyForNewLevel); // This will log the key corresponding to the newLevel
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

        const newPhoto = {
          path: response.path,
          data: response.data,
          name: response.path.split("/").pop(),
          type: 'image/jpeg',
          position: index + 1
        };
      
        setNewlyUploadedPhotos(prevPhotos => [...prevPhotos, newPhoto]);
      
        const newImages = [...images];
        newImages[index] = newPhoto;
        setImages(newImages);
        nextIndex.current = nextIndex.current + 1;

        console.log("newlyUploadedPhotos - Select photo", newlyUploadedPhotos.length)

        // setImagePaths((prevPaths) => [...prevPaths, response.path]);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const removePhoto = (index) => {
    const photoToRemove = images[index];
  
    const changedPhotos = [];

    if (photoToRemove._id) {
      setDeletedPhotos(prevDeleted => [...prevDeleted, photoToRemove._id]);
      // console.log("deletedPhotos - Remove photo", deletedPhotos.length);
    } else {
      // If it's a newly uploaded photo, remove it from the newlyUploadedPhotos array
      setNewlyUploadedPhotos(prevPhotos => prevPhotos.filter(photo => photo.path !== photoToRemove.path));
      // console.log("newlyUploadedPhotos - Remove photo", newlyUploadedPhotos.length);
    }

    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      const changedPhotos = []; // Moved inside setImages
      updatedImages.splice(index, 1);
      updatedImages.push(null);
    
      for (let i = 0; i < updatedImages.length; i++) {
        if (updatedImages[i] !== null) {
          const newPosition = i + 1;
          if (updatedImages[i].position !== newPosition) {
            updatedImages[i].position = newPosition;
            changedPhotos.push(updatedImages[i]); // Store changed photo
          }
        }
      }
    
      // Update the changedPhotosState with the newly changed photos
      if (changedPhotos.length > 0) {
        setChangedPhotosState(prevChangedPhotos => [...prevChangedPhotos, ...changedPhotos]);
      }
    
      return updatedImages;
    });
  
    console.log("Lol", changedPhotos)

    // Update the changedPhotosState with the newly changed photos
    // if (changedPhotos.length > 0) {
    //   console.log("Big test")
    //   setChangedPhotosState(prevChangedPhotos => [...prevChangedPhotos, ...changedPhotos]);
    // }
  
    // Adjust the nextIndex pointer
    nextIndex.current = Math.max(0, nextIndex.current - 1);
  };
  
  

  const convertToNumbers = (selectedPreferences, mapping, type = 'style') => {
    const reverseMapping = Object.keys(mapping).reduce((acc, key) => {
      acc[mapping[key]] = parseInt(key, 10);
      return acc;
    }, {});

    if (type === 'level') {
      return reverseMapping[selectedPreferences];
    }

    // Handle the case where there's only one value
    const selectedPreferencesArray = selectedPreferences.includes(',') ? selectedPreferences.split(', ') : [selectedPreferences];
    const numbers = selectedPreferencesArray.map(preference => reverseMapping[preference]);
    return numbers.sort((a, b) => a - b);
  };

  const reverseFightingLevels = Object.keys(fightingLevels).reduce((acc, key) => {
    acc[fightingLevels[key]] = parseInt(key, 10);
    return acc;
  }, {});

  const handleSaveFightingLevel = (newFightingLevel) => {
    console.log("newFightingLevel", newFightingLevel)
    dispatch(updateFightingLevelEdit(newFightingLevel));
  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEditProfileData(userId.userId);
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
      
      // Compute nextIndex based on newImagesArray
      nextIndex.current = newImagesArray.filter((image) => image !== null).length;
      

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
        if (data.heightUnit === 1) {
          setHeight(data.actualHeight);
        } else {
          setHeightFt(Math.floor(data.actualHeight / 12));
          setHeightInch(data.actualHeight % 12);
        }

        console.log(data.actualHeight);
        setWeight(data.actualWeight);
        // setFightingLevel([data.usersFightLevel]); // Wrap it in an array
        // setOriginalFightingLevel([data.usersFightLevel]); // Wrap it in an array
        // const styleNames = data.usersFightStyles.map(getFightingStyleName);
        // setFightingStyle(styleNames);

        setFightingLevel(data.usersFightLevel);
        setOriginalFightingLevel(data.usersFightLevel);
        const styleNames = data.usersFightStyles.map(getFightingStyleName);
        setFightingStyle(styleNames.join(', '));
        setWeightClass(data.weightClass)


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
        editProfile={true}
        handleSaveFightingLevel={handleSaveFightingLevel}
        dataToUpdate={{
          userId: userId.userId,
          fightingStyles: convertToNumbers(fightingStyle, fightingStyles),
          fightingLevel,
          originalFightingLevel,
          bio,
          weightUnit,
          weight,
          heightUnit,
          ...(heightUnit === "cm" ? { height } : { heightFt, heightInch }),
          weightClass,
          images,
          newlyUploadedPhotos,
          deletedPhotos,
          changedPhotos: changedPhotosState
        }}
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
          preference={fightingStyle}
          // Use the fightingStyle state directly, as it's already a joined string
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
                value={heightFt} // You may want to pass the calculated feet value here
                isHeightFeet={true}
                onHeightChange={handleHeightChange}
                heightType="ft"
              />
              <TextEditProf
                title='Height (")'
                value={heightInch} // You may want to pass the calculated inches value here
                isHeightFeet={true}
                onHeightChange={handleHeightChange}
                heightType="inch"
              />
            </View>
          </>
        )}
        {heightUnit === "cm" && (
          <TextEditProf
            title="Height (cm)"
            value={height} // You may want to convert inches to cm here
            onHeightChange={handleHeightChange}
            heightType="cm"
          />
        )}
        {/* <TextEditProf title={`Height (${heightUnit})`} value={height} showChevron={true}></TextEditProf> */}
        <TextEditProf title={`Weight (${weightUnit})`} value={weight} showChevron={true} onWeightChange={handleWeightChange} />

        <SettingSection title="Weight Class" onPress={() => navigation.navigate('SomeScreen')} preference={getWeightClassName(weightClass)} />

        {/* <SettingSection title="Years Experience" onPress={() => navigation.navigate('SomeScreen')} /> */}
        <Text style={settingsStyles.sectionTitle}>Bio</Text>
        <BioInput bio={bio} onBioChange={handleBioChange} />
      </ScrollView>


    </View>
  );
};

export default EditProfileScreen;
