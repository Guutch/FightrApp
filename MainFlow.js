import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/MainFlow/HomeScreen';
import SwipingScreen from './screens/MainFlow/SwipingScreen';
import MessagingScreen from './screens/MainFlow/MessagingScreen';
import CalendarScreen from './screens/MainFlow/CalendarScreen';
import ProfileScreen from './screens/MainFlow/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingsScreen from './screens/MainFlow/SettingsScreen';
import { Image, View } from 'react-native';
import { fetchImage } from './api';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const MainFlow = () => {
  const userId = useSelector(state => state.user);  // Gets the userId from the Redux state
  // console.log('User ID is:', userId.userId);
  const [imageUrl, setImageUrl] = useState(null);

  // Get's users photo for the navbar
  useEffect(() => {
    const fetchAndSetImage = async () => {
      try {
        const data = await fetchImage(userId.userId);
        if (data) {
          // console.log('Got data', data);
          setImageUrl(data.imageUrl);
        } else {
          throw new Error("No data returned from fetchImage");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchAndSetImage();
    }
  }, [userId]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let Component = Icon; // Use Icon component by default
          let iconProps = {name: '', size, color: 'white'}; // Default icon props
  
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Swiping') {
            iconName = focused ? 'hand-rock-o' : 'hand-rock-o';
          } else if (route.name === 'Messaging') {
            iconName = focused ? 'comment' : 'comment';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar';
          } else if (route.name === 'Profile') {
            if (imageUrl) {
              Component = Image; // Use Image component if imageUrl is available
              iconProps = {source: {uri: imageUrl}, style: {width: size, height: size, borderRadius: size / 2}}; // Image props
            } else {
              iconName = 'user'; // Use user icon as a placeholder when imageUrl is not available
            }
          }
  
          if (Component === Icon) {
            iconProps.name = iconName;
          }
  
          return (
            <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
              <Component {...iconProps} />
              {route.name === 'Messaging' && (
                <View
                  // style={{
                  //   position: 'absolute',
                  //   right: 0,
                  //   top: 0,
                  //   backgroundColor: 'red',
                  //   borderRadius: 5, // half of width and height
                  //   width: 10,
                  //   height: 10,
                  // }}
                />
              )}
              
            </View>
          );
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black"
        }
      })}
    >
      <Tab.Screen name="Swiping" component={SwipingScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Messaging" component={MessagingScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
  
}

export default MainFlow;
