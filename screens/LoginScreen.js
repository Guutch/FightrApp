import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Image, Dimensions } from 'react-native'
import { loginScreen } from '../components/styles2';
import { postmanTest } from '../api';
import { useSelector } from 'react-redux';
// import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const state = useSelector(state => state);

  useEffect(() => {
    console.log(state.user.isAuthenticated)
    if (isAuthenticated) {
      console.log("Authenticated");
      navigation.navigate('MainFlow');
    } else {
      console.log("Not authenticated");
    }
  }, [isAuthenticated]);

  return (
    <View style={loginScreen.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      
      {/* Other components */}
      <Image
        // style={loginScreen.fytrImg}
        source={require('../assets/LoginScreen.png')} // Make sure this path is correct
      />

      {/* Button container positioned at the bottom */}
      
      <View style={loginScreen.buttonContainer}>
      <Text style={{color: 'white', marginBottom: 10}} onPress={() => navigation.navigate('EmailLogin')}>Aready have an account? <Text style={loginScreen.linkText}>Sign in</Text></Text>
        {/* CODE HERE FOR GOOGLE/APPLE SIGN UP/SIGN IN */}
        {/* <TouchableOpacity   EmailLogin
          style={[loginScreen.bottomButton, {marginBottom: 5}]}
          onPress={() => navigation.navigate('EmailLogin')} // Handle navigation
        > 
          <Text style={loginScreen.buttonText}>Continue with Email</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={loginScreen.bottomButton}
          onPress={() => navigation.navigate('SignUpFlow')} // Handle navigation
        >
          <Text style={loginScreen.buttonText}>Sign up with Email</Text>
        </TouchableOpacity>
      </View>

      {/* Terms and conditions text */}
      <Text style={loginScreen.termsAndConditions} onPress={() => navigation.navigate('TermsAndCond')}>
        By proceeding, you consent to our terms and conditions. See 
        <Text style={loginScreen.linkText}>
          {' '}Terms and Conditions
        </Text> here.
      </Text>
    </View>
  );
}

export default LoginScreen