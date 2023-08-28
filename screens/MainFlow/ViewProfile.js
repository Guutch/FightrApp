import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Navbar from '../../components/Navbar';
import { settingsStyles, welcomeStyles } from '../../components/styles2';
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

  // 1. When looking at another user's profile,
  // you need to get that user's height, weight, and bio information,
  // as well as both the heightUnit and weightUnit for the logged-in user
  // and the other user.
  // 2. When looking at their own profile, a user only needs
  // their own height, weight, bio, heightUnit, and weightUnit.

  const weightUnitMapping = {
    1: 'kg',
    2: 'lbs'
  };

  const heightUnitMapping = {
    1: 'cm',
    2: 'in'
  };

  const inchesToFeetAndInches = (inches) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return { feet, remainingInches };
  };


  useEffect(() => {
    const fetchData = async () => {
      let targetUserId, profileData;
      const { user: passedUser, weightClass: passedWeightClass, level: passedLevel, fightingStyleDict: fightingStyleDict, totalImages } = route.params;
  
      console.log(totalImages)
      setProgress((currentImageIndex + 1) / totalImages);

      if (isOwnProfile) {
        targetUserId = userId.userId;
        profileData = await fetchEditProfileData(targetUserId);
      } else {
        targetUserId = passedUser.userId;
        const loggedInMetrics = await fetchMetrics(userId.userId); // Logged in user
        let additionalData = await fetchAdditionalUserData(targetUserId); // Other user
        const styleNames = passedUser.fightingStyle.map(styleId => fightingStyleDict[styleId]);
  
        if (loggedInMetrics && additionalData) {
          // Conversion if needed
          if (loggedInMetrics.heightUnit !== additionalData.heightUnit) {
            if (loggedInMetrics.heightUnit === 1 && additionalData.heightUnit === 2) {
              // Convert height from inches to cm
              additionalData.height = Math.round(additionalData.height * 2.54);
              additionalData.heightUnit = 1;
            } else if (loggedInMetrics.heightUnit === 2 && additionalData.heightUnit === 1) {
              // Convert height from cm to inches
              additionalData.height = Math.round(additionalData.height * 0.393701);
              additionalData.heightUnit = 2;
            }
          }
  
          if (loggedInMetrics.weightUnit !== additionalData.weightUnit) {
            if (loggedInMetrics.weightUnit === 1 && additionalData.weightUnit === 2) {
              // Convert weight from lbs to kg
              additionalData.weight = Math.round(additionalData.weight * 0.453592);
              additionalData.weightUnit = 1;
            } else if (loggedInMetrics.weightUnit === 2 && additionalData.weightUnit === 1) {
              // Convert weight from kg to lbs
              additionalData.weight = Math.round(additionalData.weight * 2.20462);
              additionalData.weightUnit = 2;
            }
          }
        }
  
        profileData = {
          ...passedUser,
          ...additionalData,
          weightClass: passedWeightClass,
          style: styleNames.join(', '),
          level: passedLevel
        };
      }
  
      const imageData = await fetchImages(targetUserId);
      if (imageData) {
        const sortedImageData = imageData.sort((a, b) => a.position - b.position);
        setImages(sortedImageData);
      }
      setProfileDataState(profileData);
    };
  
    fetchData();
  }, [userId, passedUser, isOwnProfile]);
  




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
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        showBackButton={true}
        navigation={navigation}  // Here we pass navigation as a prop to Navbar
        title="Fytr"  // Here's the custom title
      />
      <ScrollView contentContainerStyle={settingsStyles.container}>
      
        {images &&
          <TouchableOpacity onPress={handleImagePress}>
            <ProgressBar progress={progress} isInsideCard={true} />
            <Image
              source={{ uri: images[currentImageIndex].url }}
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


        <Text style={settingsStyles.sectionTitle}>Fighter Details</Text>
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
          {!isOwnProfile && (
            <View>
              <Text>Location: Loading...</Text>
            </View>
          )}
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
        {!isOwnProfile && (
          <View style={ {marginTop: 10} }>
            <SettingSection settingButton={true} preference={"Share Profile"} />
            <SettingSection settingButton={true} preference={"Block Account"} />
            <SettingSection settingButton={true} preference={"Report Account"} />
          </View>
        )}

      </ScrollView>
    </View>
  );
};

export default ViewProfileScreen;