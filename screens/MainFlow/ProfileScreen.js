import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import boxingIcon from '../../assets/boxing-glove-icon2.png';
import { styles,settingsStyles  } from '../../components/styles2';
import SettingSection from '../../components/SettingSection';
import { fetchImage, fetchName } from '../../api';
import { useSelector } from 'react-redux';

const ProfileScreen = ({ navigation }) => {
const userId = useSelector(state => state.user);  // Gets the userId from the Redux state
const [imageUrl, setImageUrl] = useState(null);
const [name, setName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Here")
      const data = await fetchImage(userId.userId);
      const usersName = await fetchName(userId.userId);
      
      setImageUrl(data.imageUrl);
      setName(usersName.fullName);
    };
    
    fetchData();
  }, [userId]);

  return (
    <View>
      <Navbar 
        backgroundColor="#FFFFFF" 
        textColor="#000000" 
        homeStyle={true} 
        navigation={navigation}  // Here we pass navigation as a prop to Navbar
      />
      <View style={settingsStyles.container}> 
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
      <SettingSection
      preference={"Edit Profile"}
      onPress={() => navigation.navigate('EditProfileScreen', {
        usersName: name
      })}
      />
      <SettingSection preference={"Logout"} />

      </View>
      
    </View>
  );
};

export default ProfileScreen;