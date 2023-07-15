import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import UserProfileCard from '../../components/UserProfileCard';
import Navbar from '../../components/Navbar';
import { fetchEditProfileData, fetchUsersAndImages, fetchImages } from '../../api';
import { settingsStyles, welcomeStyles } from '../../components/styles2';

const MyProfileScreen = ({ navigation }) => {
  const userId = useSelector(state => state.user);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);  // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const foundUsers = await fetchUsersAndImages(userId.userId);
    
        // // Sort each user's images array by the 'position' attribute
        // foundUsers.forEach(user => {
        //   user.images.sort((a, b) => a.position - b.position);
        // });
    
        // setUser(foundUsers[0]);  // Set the first user to state

        const imageData = await fetchImages(userId.userId);
      console.log("imageData")
      console.log(imageData)
      console.log("imageData")


      const data = await fetchEditProfileData(userId.userId);
      console.log("data")
      console.log(data)
      console.log("data")

      // sort image data by posit
      const userData = {
        ...data,
        images: imageData,
      };

      console.log(userData)
      setUser(userData);  // Set the user data to state
      setIsLoading(false);  // Stop showing the loader
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleImageTap = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % user.images.length);
  };

  return (
    <View>
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        showBackButton={true}
        navigation={navigation}
        title="View Profile"
      />
      <View style={settingsStyles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          user && user.images && (
            <UserProfileCard 
              user={user} 
              navigation={navigation} 
              viewOnly={true}  // set viewOnly to true
              currentImageIndex={currentImageIndex} 
              handleImagePress={handleImageTap} // pass handleImageTap function to handle the image change on tap
            />
          )
        )}
      </View>
    </View>
  );
  
};

export default MyProfileScreen;