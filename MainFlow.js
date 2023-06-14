import { React, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/MainFlow/HomeScreen';
import SwipingScreen from './screens/MainFlow/SwipingScreen';
import MessagingScreen from './screens/MainFlow/MessagingScreen';
import CalendarScreen from './screens/MainFlow/CalendarScreen';
import ProfileScreen from './screens/MainFlow/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingsScreen from './screens/MainFlow/SettingsScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();



const MainFlow = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Swiping') {
            iconName = focused ? 'hand-rock-o' : 'hand-rock-o';
          } else if (route.name === 'Messaging') {
            iconName = focused ? 'comment' : 'comment';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar';
          } else if (route.name === 'Profile') {
            // Leave iconName undefined for Profile, because we will custom render it
            return (
              <Image 
                source={{uri: 'URL_OF_PROFILE_PICTURE'}} 
                style={{width: size, height: size, borderRadius: size / 2}} // makes it circular
              />
            );
          } 

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
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
