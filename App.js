import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import FirstName from './screens/FirstName';
import EmailAndNumber from './screens/EmailAndNumber';
import HeightAndWeight from './screens/HeightAndWeight';
import BirthdayScreen from './screens/Birthday';
import PhotosScreen from './screens/PhotosScreen';
import FightingScreen from './screens/FightingScreen';
import FightingLevelScreen from './screens/FightingLevel';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          //   options={{title: 'Home'}}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="FirstName" component={FirstName} options={{ headerShown: false }} />
        <Stack.Screen name="EmailAndNumber" component={EmailAndNumber} options={{ headerShown: false }} />
        <Stack.Screen name="HeightAndWeight" component={HeightAndWeight} options={{ headerShown: false }} />
        <Stack.Screen name="Birthday" component={BirthdayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Photos" component={PhotosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FightingScreen" component={FightingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FightingLevelScreen" component={FightingLevelScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;