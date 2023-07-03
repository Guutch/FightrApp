import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import boxingIcon from '../../assets/boxing-glove-icon2.png';
import { welcomeStyles } from '../../components/styles2';

const ProfileScreen = ({ navigation }) => {

  return (
    <View>
      <Navbar 
        backgroundColor="#FFFFFF" 
        textColor="#000000" 
        homeStyle={true} 
        navigation={navigation}  // Here we pass navigation as a prop to Navbar
      />
      
    </View>
  );
};

export default ProfileScreen;
