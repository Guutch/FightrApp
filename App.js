import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpFlow from './SignUpFlow';
import MainFlow from './MainFlow';
import LoginScreen from './screens/LoginScreen';
import EmailLogin from './screens/EmalLogIn';
import SettingsScreen from './screens/MainFlow/SettingsScreen';
import EditProfileScreen from './screens/MainFlow/EditProfile';
import ViewProfileScreen from './screens/MainFlow/ViewProfile';
import PreferenceSel from './screens/MainFlow/PreferenceSel';
import FightingScreen from './screens/Signup/FightingScreen';

const Stack = createNativeStackNavigator();

// To Test when I am ready - To test the 'user is logged in' flow
// let userId = 'mockedUserId'; // Remove this once you implement JWTs and redux-persist


const MyStack = () => {
  // Getting the logged-in user's ID from Redux state
  const userId = useSelector((state) => state.userId);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userId ? (
          // User is logged in
          <>
            <Stack.Screen name="MainFlow" component={MainFlow} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="FightingScreen" component={FightingScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="ViewProfileScreen" component={ViewProfileScreen} />
          </>
        ) : (
          // User is not logged in already
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="EmailLogin" component={EmailLogin} />
            <Stack.Screen name="MainFlow" component={MainFlow} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="ViewProfileScreen" component={ViewProfileScreen} />
            <Stack.Screen name="PreferenceSel" component={PreferenceSel} />
            <Stack.Screen name="SignUpFlow" component={SignUpFlow} />
            <Stack.Screen name="FightingScreen" component={FightingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
