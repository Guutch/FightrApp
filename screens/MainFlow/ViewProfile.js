import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Navbar from '../../components/Navbar';
import { settingsStyles, welcomeStyles } from '../../components/styles2';
import SettingSection from '../../components/SettingSection'
import { fetchEditProfileData, fetchImages } from '../../api';
import { useSelector } from 'react-redux';

// {
//   "birthday": "2000-07-23T23:00:00.000Z",
//   "fightingLevel": 1,
//   "fightingStyle": [
//     1
//   ],
//   "firstName": "Muhammed",
//   "images": [
//     // Image data
//   ],
//   "location": {
//     // Location data
//   },
//   "swiped": null,
//   "userId": "64be991fce3d5eaf1892897a",
//   "weightClass": 1
// }
// What I get:
// "firstName": "Muhammed"
// "birthday": "2000-07-23T23:00:00.000Z"
// "fightingLevel": 1
// "fightingStyle": [1]
// images
// "weightClass": 1

// I am missing:
// - Bio
// - Height
// - Weight

const DividerTitle = ({ title }) => {
  return (
    <Text style={settingsStyles.dividerTitle}>{title}</Text>
  );
};

const ViewProfileScreen = ({ navigation, route }) => {
  const [images, setImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const userId = useSelector(state => state.user);  // Gets the userId from the Redux state
  const passedUser = route.params?.user; // Access the passed user data from navigation parameters

  const isOwnProfile = userId.userId === passedUser?.userId;

  useEffect(() => {
    const fetchData = async () => {
      const targetUserId = isOwnProfile ? userId.userId : passedUser.userId;
      const data = await fetchEditProfileData(targetUserId);
      const imageData = await fetchImages(targetUserId);

      if (imageData) {
        const sortedImageData = imageData.sort((a, b) => a.position - b.position);
        setImages(sortedImageData);
      }
    };

    console.log("route", route)

    fetchData();
  }, [userId, passedUser]);

  const handleImagePress = () => {
    setCurrentImageIndex((prevIndex) => {
      if (prevIndex < images.length - 1) {
        return prevIndex + 1;
      }
      return 0;
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
        <DividerTitle title={route.params?.user?.firstName} />

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
            <Text>Class</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text> Height: </Text>
              <Text> Weight: </Text>
            </View>

          </View>

          {/* Second Row */}
          <View style={{ marginBottom: 10 }}>
            <Text>Fighting Styles: Dummy Data</Text>
          </View>

          {/* Third Row */}
          <View style={{ marginBottom: 10 }}>
            <Text>Fight Level: Dummy Data</Text>
          </View>

          {/* Fourth Row */}
          <View>
            <Text>Location: Dummy Data</Text>
          </View>
        </View>
        <Text style={settingsStyles.sectionTitle}>Bio</Text>
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
            <Text>Location: Dummy Data</Text>
          </View>
        </View>
        {!isOwnProfile && (
          <View>
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