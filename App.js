import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Keychain from 'react-native-keychain';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { userLoggedIn, userLoggedOut } from './redux/actions'
import { navigationRef } from './RootNavigation';

import SignUpFlow from './SignUpFlow';
import MainFlow from './MainFlow';
import LoginScreen from './screens/LoginScreen';
import EmailLogin from './screens/EmalLogIn';
import SettingsScreen from './screens/MainFlow/SettingsScreen';
import EditProfileScreen from './screens/MainFlow/EditProfile';
import ViewProfileScreen from './screens/MainFlow/ViewProfile';
import MyProfileScreen from './screens/MainFlow/MyProfileScreen';
import PreferenceSel from './screens/MainFlow/PreferenceSel';
import RealTimeMessaging from './screens/MainFlow/RealTimeMessaging';
import NotificationScreen from './screens/MainFlow/NotificationScreen';
import FightingScreen from './screens/Signup/FightingScreen';
import TermsAndCond from './screens/Legal/TermsAndCond';

const Stack = createNativeStackNavigator();

// To Test when I am ready - To test the 'user is logged in' flow
// let userId = 'mockedUserId'; / Remove this once you implement JWTs and redux-persist


const MyStack = () => {
  // const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log("JWT There");
        const decodedToken = jwt_decode(credentials.password);
        const userIdFromToken = decodedToken.userId;
        dispatch(userLoggedIn(userIdFromToken));
        // navigation.navigate("MainFlow")
      } else {
        console.log("JWT Not There");
        dispatch(userLoggedOut());
      }
      setLoaded(true);
    };

    checkUserAuthentication();
  }, []);

  if (!loaded) {
    console.log("Not loaded");
    // return <ActivityIndicator />;  // Or some other loading indicator
  } else {
    console.log("Loaded")
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
  {/* All screens are now here, regardless of authentication state */}
  <Stack.Screen name="LoginScreen">
            {(props) => <LoginScreen {...props} />}
          </Stack.Screen>
  <Stack.Screen name="MainFlow" component={MainFlow} />
  <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
  <Stack.Screen name="FightingScreen" component={FightingScreen} />
  <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
  <Stack.Screen name="ViewProfileScreen" component={ViewProfileScreen} />
  <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
  <Stack.Screen name="TermsAndCond" component={TermsAndCond} />
  <Stack.Screen name="RealTimeMessaging" component={RealTimeMessaging} />
  <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
  <Stack.Screen name="EmailLogin" component={EmailLogin} />
  <Stack.Screen name="PreferenceSel" component={PreferenceSel} />
  <Stack.Screen name="SignUpFlow" component={SignUpFlow} />
</Stack.Navigator>
    </NavigationContainer>
  );
  
};
}

export default MyStack;
