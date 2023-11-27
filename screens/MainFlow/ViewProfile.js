import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Navbar from '../../components/Navbar';
import { settingsStyles, firstNameScreen } from '../../components/styles2';
import SettingSection from '../../components/SettingSection'
import ProgressBar from '../../components/ProgressBar'
import { fetchEditProfileData, fetchImages, fetchAdditionalUserData, fetchMetrics } from '../../api';
import { useSelector } from 'react-redux';

const ViewProfileScreen = ({ navigation, route }) => {
  const [images, setImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const userId = useSelector(state => state.user);  // Gets the userId from the Redux state
  const passedUser = route.params?.user; // Access the passed user data from navigation parameters

  const isOwnProfile = userId.userId === passedUser?.userId;

  const [profileDataState, setProfileDataState] = useState(null);

  const totalImages = route.params.totalImages; // Since totalImages is static, we can just take it from route.params
  const [progress, setProgress] = useState(1 / totalImages); // Initialize progress

  const weightUnitMapping = {
    1: 'kg',
    2: 'lbs'
  };

  const heightUnitMapping = {
    1: 'cm',
    2: 'in'
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

  const fightingLevels = {
    1: 'Professional',
    2: 'Amateur Competitor',
    3: 'Advanced',
    4: 'Intermediate',
    5: 'Beginner',
    6: 'Novice',
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

  const inchesToFeetAndInches = (inches) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return { feet, remainingInches };
  };


  useEffect(() => {
    const fetchData = async () => {
      let targetUserId;
      let profileData;
      const {
        user: passedUser,
        weightClass: passedWeightClass,
        level: passedLevel,
        fightingStyleDict,
        totalImages,
        matchId,
        firstName
      } = route.params;
  
      setProgress((currentImageIndex + 1) / totalImages);
  
      try {
        if (isOwnProfile) {
          targetUserId = userId.userId;
          profileData = await fetchEditProfileData(targetUserId);
        } else if (matchId) {
          // This code is for when you navigate from Messaging screen
          targetUserId = matchId;
          profileData = await fetchEditProfileData(matchId);

          console.log("Plz", profileData)
          const loggedInMetrics = await fetchMetrics(userId.userId);
          let additionalData = await fetchAdditionalUserData(matchId);
          const styleNames = profileData.usersFightStyles.map(styleId => fightingStyles[styleId]);
          
          // Handle unit conversion for height and weight
          // Your existing unit conversion logic here...
  
          const weightClassNumber = profileData.weightClass;

// Map the weight class number to its string representation
const weightClassName = weightClasses[weightClassNumber];

          // Merge profile data
          profileData = {
            firstName,
            ...profileData,
            ...additionalData,
            weightClass: weightClassName, // You need to define where this comes from
            style: styleNames.join(', '), // Join style names into a string
            level: passedLevel // You need to define where this comes from
          };

          profileData.level = fightingLevels[profileData.usersFightLevel];


          console.log("profileData", profileData)
        } else {
          targetUserId = passedUser.userId;
          profileData = await fetchEditProfileData(targetUserId);
          const loggedInMetrics = await fetchMetrics(userId.userId);
          let additionalData = await fetchAdditionalUserData(targetUserId);
          const styleNames = passedUser.fightingStyle.map(styleId => fightingStyleDict[styleId]);
  
          // Handle unit conversion for height and weight
          if (loggedInMetrics && additionalData) {
            if (loggedInMetrics.heightUnit !== additionalData.heightUnit) {
              additionalData.height = loggedInMetrics.heightUnit === 1
                ? Math.round(additionalData.height * 2.54) // inches to cm
                : Math.round(additionalData.height * 0.393701); // cm to inches
              additionalData.heightUnit = loggedInMetrics.heightUnit;
            }
  
            if (loggedInMetrics.weightUnit !== additionalData.weightUnit) {
              additionalData.weight = loggedInMetrics.weightUnit === 1
                ? Math.round(additionalData.weight * 0.453592) // lbs to kg
                : Math.round(additionalData.weight * 2.20462); // kg to lbs
              additionalData.weightUnit = loggedInMetrics.weightUnit;
            }
          }
  
          // Merge profile data
          profileData = {
            ...passedUser,
            ...additionalData,
            weightClass: passedWeightClass,
            style: styleNames.join(', '),
            level: passedLevel
          };
          console.log("profileData", profileData)
        }
  
        // Fetch and sort images, if targetUserId is set
        if (targetUserId) {
          const imageData = await fetchImages(targetUserId);
          if (imageData) {
            const sortedImageData = imageData.sort((a, b) => a.position - b.position);
            setImages(sortedImageData);
          }
        }
  
        // Finally, set the profile data state
        setProfileDataState(profileData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Handle errors appropriately in your UI
      }
    };
  
    fetchData();
  }, [userId, route.params, isOwnProfile]);
  





  const handleImagePress = () => {
    setCurrentImageIndex(prevIndex => {
      let newIndex;
      if (prevIndex < images.length - 1) {
        newIndex = prevIndex + 1;
      } else {
        newIndex = 0;
      }

      // Update progress here
      console.log(progress)
      setProgress((newIndex + 1) / totalImages);

      return newIndex;
    });
  };

  return (
    <View>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        showBackButton={true}
        navigation={navigation}  // Here we pass navigation as a prop to Navbar
      />
      <View style={Platform.OS === 'ios' ? firstNameScreen.iPhone : {}}>

      
      <ScrollView contentContainerStyle={settingsStyles.container}>

        {images &&
          <TouchableOpacity onPress={handleImagePress} activeOpacity={1}>
            <ProgressBar progress={progress} isInsideCard={true} viewProfile={true} />
            <Image
              source={{ uri: images[currentImageIndex].url }}
              fadeDuration={0}
              style={{
                width: 371,
                height: 361,
                borderRadius: 20,
                alignSelf: 'center',
                marginTop: 3
              }}
            />
          </TouchableOpacity>
        }
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text style={settingsStyles.dividerTitle}>
            {profileDataState ? profileDataState.firstName : 'Loading...'}
          </Text>
          {profileDataState && profileDataState.birthday && (
            <Text style={{
              fontFamily: 'Inter',
              fontSize: 20,
              fontWeight: '400',
              lineHeight: 24,
              letterSpacing: 0,
              paddingTop: 2,
              textAlign: 'left',
              marginLeft: 5  // Adds a small space between the name and the age
            }}>
              {new Date().getFullYear() - new Date(profileDataState.birthday).getFullYear()}
            </Text>
          )}
        </View>

        {/* <DividerTitle title={profileDataState ? profileDataState.firstName : 'Loading...'} /> */}


        <Text style={settingsStyles.sectionTitle}>Details</Text>
        <View style={{
          width: 371,
          backgroundColor: '#D9D9D9',
          alignSelf: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 5,
        }}>
          {/* First Row */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text>{profileDataState ? profileDataState.weightClass : 'Loading...'}</Text>
            <View style={{ flexDirection: 'row' }}>
              {
                profileDataState && (
                  <>
                    {
                      profileDataState.heightUnit === 2 ?
                        (() => {
                          const { feet, remainingInches } = inchesToFeetAndInches(Math.round(profileDataState.height));
                          return <Text>{feet}ft {remainingInches}in  </Text>;
                        })()
                        :
                        <Text>{Math.round(profileDataState.height)} {heightUnitMapping[profileDataState.heightUnit]} </Text>
                    }
                    <Text>{Math.round(profileDataState.weight)} {weightUnitMapping[profileDataState.weightUnit]} </Text>
                  </>
                )
              }

            </View>
            {/* profileData.level */}
          </View>

          {/* Second Row */}
          <View style={{ marginBottom: 10 }}>
            <Text>{profileDataState ? profileDataState.style : 'Loading...'}</Text>
          </View>

          {/* Third Row */}
          <View style={{ marginBottom: 10 }}>
            <Text>{profileDataState ? profileDataState.level : 'Loading...'}</Text>
          </View>

          {/* Fourth Row */}
          {/* {!isOwnProfile && (
            <View>
              <Text>Location: Loading...</Text>
            </View>
          )} */}
        </View>
        <Text style={{ ...settingsStyles.sectionTitle, marginTop: 10 }}>Bio</Text>

        <View style={{
          width: 371,
          backgroundColor: '#D9D9D9',
          alignSelf: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          minHeight: 100,
          paddingBottom: 10,
          borderRadius: 5,
        }}>

          <View>
            <Text>{profileDataState ? profileDataState.bio : 'Loading...'}</Text>
          </View>
        </View>
        {/* {!isOwnProfile && (
          <View style={ {marginTop: 10} }>
            <SettingSection settingButton={true} preference={"Share Profile"} />
            <SettingSection settingButton={true} preference={"Block Account"} />
            <SettingSection settingButton={true} preference={"Report Account"} />
          </View>
        )} */}

      </ScrollView>
      </View>
    </View>
  );
};

export default ViewProfileScreen;