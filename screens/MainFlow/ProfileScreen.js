import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Navbar from '../../components/Navbar';
import boxingIcon from '../../assets/boxing-glove-icon2.png';
import { styles,settingsStyles  } from '../../components/styles2';
import SettingSection from '../../components/SettingSection';
import { fetchImage, fetchName } from '../../api';
import { getWebSocketInstance } from './../../Backend/websocketInstance'
import { useDispatch, useSelector } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import DatePicker from 'react-native-date-picker'
import { userLoggedOut } from '../../redux/actions'


const ProfileScreen = ({ navigation }) => {
const userId = useSelector(state => state.user);  // Gets the userId from the Redux state
const [imageUrl, setImageUrl] = useState(null);
const [name, setName] = useState(null);
const dispatch = useDispatch();
const isAuthenticated = useSelector(state => state.isAuthenticated);
const [date, setDate] = useState(new Date())
const [open, setOpen] = useState(false)

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

const handleBirthday = () => {
  return (
    <View style={styles.container}>
      <DatePicker date={chosenDate} onDateChange={setChosenDate} />
    </View>
  );
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
      <DatePicker
  modal
  open={open}
  date={date}
  mode="date" // Set the mode to 'date' to show only the month, day, and year
  onConfirm={(date) => {
    setOpen(false)
    setDate(date)
  }}
  onCancel={() => {
    setOpen(false)
  }}
/>

      <View style={settingsStyles.container}> 
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.text}>{name} </Text>
      <SettingSection
      preference={"Edit Profile"}
      onPress={() => navigation.navigate('EditProfileScreen', {
        usersName: name
      })}
      />
      <SettingSection preference={"Logout"} onPress={handleLogout} />
      <SettingSection preference={"Birthday"} onPress={() => setOpen(true)} />


      </View>
      
    </View>
  );
};

export default ProfileScreen;