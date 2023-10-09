import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import boxingIcon from '../../assets/boxing-glove-icon2.png';
import { styles,settingsStyles  } from '../../components/styles2';
import SettingSection from '../../components/SettingSection';
import { fetchImage, fetchName } from '../../api';
import { getWebSocketInstance } from './../../Backend/websocketInstance'
import { useDispatch, useSelector } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import { CommonActions } from '@react-navigation/native';
import { userLoggedOut } from '../../redux/actions'


const ProfileScreen = ({ navigation }) => {
const userId = useSelector(state => state.user);  // Gets the userId from the Redux state
const [imageUrl, setImageUrl] = useState(null);
const [name, setName] = useState(null);
const dispatch = useDispatch();
const isAuthenticated = useSelector(state => state.isAuthenticated);
  // const dispatch = useDispatch();

const handleLogout = async () => {
  // Clear JWT from secure storage
  try {
          // Clear JWT from secure storage
          await Keychain.resetGenericPassword();
          console.log("JWT removed from Keychain");
        } catch (error) {
          console.log("Error removing JWT from Keychain:", error);
        }

  // Invalidate WebSocket connection
  const ws = getWebSocketInstance();
  if (ws) {
    ws.close();
  }

  // Dispatch logout action to Redux
  dispatch(userLoggedOut());

//   console.log('Navigation Object:', navigation);
// console.log('Navigation State:', navigation.dangerouslyGetState());

  // Redirect to login screen
  // navigation.dispatch(
  //   CommonActions.reset({
  //     index: 0,
  //     routes: [{ name: 'LoginScreen' }],
  //   })
  // );
  navigation.navigate('LoginScreen');

};

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
    <View style={{backgroundColor: "white", height: "100%"}}>
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
      <SettingSection preference={"Logout"} onPress={handleLogout} />

      </View>
      
    </View>
  );
};

export default ProfileScreen;