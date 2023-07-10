import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Navbar from '../../components/Navbar';
import { settingsStyles, welcomeStyles } from '../../components/styles2';
import { fetchEditProfileData, fetchImages } from '../../api';
import { useSelector } from 'react-redux';

// Will use for Share, Block, and Report functionality
const SettingSection = ({ title, onPress, titleInsideRectangle = false, data }) => {
    return (
        <View style={settingsStyles.sectionContainer}>
            {titleInsideRectangle ? null : <Text style={settingsStyles.sectionTitle}>{title}</Text>}
            <TouchableOpacity
                style={[
                    settingsStyles.sectionRectangle,
                    titleInsideRectangle ? { justifyContent: 'center', alignItems: 'center' } : null
                ]}
                onPress={onPress}
            >
                {data ?
                    <Text style={settingsStyles.preferenceText}>{data}</Text>
                    : <Text style={settingsStyles.preferenceText}>Loading...</Text>
                }
            </TouchableOpacity>
        </View>
    );
};

const ViewProfileScreen = ({ navigation, route }) => {
  const [images, setImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const userId = useSelector(state => state.user);  // Gets the userId from the Redux state
  const passedUser = route.params?.user; // Access the passed user data from navigation parameters

  useEffect(() => {
    const fetchData = async () => {
      // Decide whether to display the passed user's info or the logged-in user's info
      const targetUserId = passedUser ? passedUser.userId : userId.userId;
      const data = await fetchEditProfileData(targetUserId);
      const imageData = await fetchImages(targetUserId);
      
      // sort image data by position before setting state
      if (imageData) {
        const sortedImageData = imageData.sort((a, b) => a.position - b.position);
        setImages(sortedImageData);
      }
    };
    fetchData();
  }, [userId, passedUser]);  // Add 'passedUser' to the dependency array so that the effect re-runs when 'passedUser' changes

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
      </ScrollView>
    </View>
  );
};

export default ViewProfileScreen;
