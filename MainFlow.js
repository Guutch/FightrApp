import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/MainFlow/HomeScreen';
import SwipingScreen from './screens/MainFlow/SwipingScreen';
import MessagingScreen from './screens/MainFlow/MessagingScreen';
import CalendarScreen from './screens/MainFlow/CalendarScreen';
import ProfileScreen from './screens/MainFlow/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingsScreen from './screens/MainFlow/SettingsScreen';
import { Image } from 'react-native';
import { fetchImage } from './api'

const Tab = createBottomTabNavigator();

const MainFlow = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchAndSetImage = async () => {
      try {
        const data = await fetchImage('6488bb6a88352f4d19c12f9e'); // Replace with your user ID
        if (data) {
          console.log('Got data', data)
          setImageUrl(data.imageUrl);
        } else {
          throw new Error("No data returned from fetchImage");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAndSetImage();
  }, []);

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
  
          // Assign the iconName to the iconProps if Component is Icon
          if (Component === Icon) {
            iconProps.name = iconName;
          }
  
          // You can return any component that you like here!
          return <Component {...iconProps} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black"
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Swiping" component={SwipingScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Messaging" component={MessagingScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
  
}

export default MainFlow;
