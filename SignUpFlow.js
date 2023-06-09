import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FirstName from './screens/Signup/FirstName';
import EmailAndNumber from './screens/Signup/EmailAndNumber';
import SignUpPassword from './screens/Signup/SignUpPassword';
import HeightAndWeight from './screens/Signup/HeightAndWeight';
import BirthdayScreen from './screens/Signup/Birthday';
import PhotosScreen from './screens/Signup/PhotosScreen';
import FightingScreen from './screens/Signup/FightingScreen';
import FightingLevelScreen from './screens/Signup/FightingLevel';
import SignUpLocation from './screens/Signup/SignUpLocation';
import Welcome from './screens/Signup/Welcome';
import Waiver from './screens/Signup/Waiver';
import AvoidContact from './screens/Signup/AvoidContact';

const SignUpStack = createNativeStackNavigator();

const SignUpFlow = () => {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen name="FirstName" component={FirstName} options={{ headerShown: false }} />
      <SignUpStack.Screen name="EmailAndNumber" component={EmailAndNumber} options={{ headerShown: false }} />
      <SignUpStack.Screen name="SignUpPassword" component={SignUpPassword} options={{ headerShown: false }} />
      <SignUpStack.Screen name="HeightAndWeight" component={HeightAndWeight} options={{ headerShown: false }} />
      <SignUpStack.Screen name="Birthday" component={BirthdayScreen} options={{ headerShown: false }} />
      <SignUpStack.Screen name="Photos" component={PhotosScreen} options={{ headerShown: false }} />
      <SignUpStack.Screen name="FightingScreen" component={FightingScreen} options={{ headerShown: false }} />
      <SignUpStack.Screen name="FightingLevelScreen" component={FightingLevelScreen} options={{ headerShown: false }} />
      <SignUpStack.Screen name="SignUpLocation" component={SignUpLocation} options={{ headerShown: false }} />
      <SignUpStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <SignUpStack.Screen name="Waiver" component={Waiver} options={{ headerShown: false }} />
      <SignUpStack.Screen name="AvoidContact" component={AvoidContact} options={{ headerShown: false }} />
    </SignUpStack.Navigator>
  );
};

export default SignUpFlow;
