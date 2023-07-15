import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import boxingIcon from '../../assets/boxing-glove-icon2.png';
import { settingsStyles, welcomeStyles } from '../../components/styles2';
import { fetchEditProfileData } from '../../api';
import { useSelector } from 'react-redux';

const ProfileScreen = ({ navigation }) => {
const userId = useSelector(state => state.user);  // Gets the userId from the Redux state

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEditProfileData(userId.userId); 
      console.log(data);
    };
    
    fetchData();
  }, [userId]);

  const onSelect = () => {
    // Implement the logic for the onSelect function here
    console.log('Button pressed!');
    navigation.navigate('ViewProfileScreen');
  };

  return (
    <View>
      <Navbar 
        backgroundColor="#FFFFFF" 
        textColor="#000000" 
        homeStyle={true} 
        navigation={navigation}  // Here we pass navigation as a prop to Navbar
      />
      
      <View style={{ paddingTop: 100, paddingLeft: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfileScreen')}
          style={{
            backgroundColor: 'black',
            width: '80%',
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 24 }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 100, paddingLeft: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyProfileScreen')}
          style={{
            backgroundColor: 'black',
            width: '80%',
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 24 }}>View Profile</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default ProfileScreen;