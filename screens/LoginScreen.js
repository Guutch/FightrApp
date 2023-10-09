import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { loginScreen } from '../components/styles2';
import { postmanTest } from '../api';
import { useSelector } from 'react-redux';
// import { useFocusEffect } from '@react-navigation/native';


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
            {/* <StatusBar backgroundColor="black" barStyle="light-content" /> */}
            {/* <Video source={require('./assets/pexels.mp4')} style={loginScreen.video} repeat={true} resizeMode='cover' /> */}
            <Text style={loginScreen.title}>Fytr</Text>
            <Text style={loginScreen.subtitle}>The Game's The Game</Text>
            <View style={loginScreen.buttonContainer}>
                <TouchableOpacity style={loginScreen.topButton} onPress={() => console.log('Continue with Apple')}>
                    <Text style={loginScreen.buttonText}>Continue with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={loginScreen.middleButton} onPress={() => console.log('Continue with Google')}>
                    <Text style={loginScreen.buttonText}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={loginScreen.bottomButton} onPress={() => navigation.navigate('EmailLogin')}>
                    <Text style={loginScreen.buttonText}>Continue with Email</Text>
                </TouchableOpacity>

            </View>
            <Text style={loginScreen.termsAndConditions}>
                By proceeding, you consent to our terms and conditions. See <Text style={loginScreen.linkText}>Terms and Conditions</Text> here.
            </Text>
        </View>
    )
}

export default LoginScreen