import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Navbar from '../../components/Navbar';
import boxingIcon from '../../assets/boxing-glove-icon2.png';
import tickIcon from '../../assets/FightrTick.png';
import { welcomeStyles } from '../../components/styles2';
import { useSelector } from 'react-redux';

const Welcome = ({ navigation }) => {
  const userId = useSelector((state) => state.user.userId); // replace 'state.user.userId' with the correct path to the user ID in your Redux state
  return (
    <View style={welcomeStyles.container}>
<Navbar showBackButton={false} showNextButton={false} />

      <Image source={boxingIcon} style={welcomeStyles.boxingIcon} />
      <Text style={welcomeStyles.welcomeText}>Welcome to Fightr!</Text>
      <Text style={welcomeStyles.subText}>We understand you want to get straight into smashing, but first, some rules.</Text>
      <View style={welcomeStyles.rulesContainer}>
        <View style={welcomeStyles.rule}>
          <Image source={tickIcon} style={welcomeStyles.tickIcon} />
          <View style={welcomeStyles.ruleContent}>
            <Text style={welcomeStyles.ruleTitle}>Be You!</Text>
            <Text style={welcomeStyles.ruleText}>On Fightr, you are only allowed one account, so make sure your account only has your photos, your age, and your details.</Text>
          </View>
        </View>
        <View style={welcomeStyles.rule}>
          <Image source={tickIcon} style={welcomeStyles.tickIcon} />
          <View style={welcomeStyles.ruleContent}>
            <Text style={welcomeStyles.ruleTitle}>Stay Safe!</Text>
            <Text style={welcomeStyles.ruleText}>Remember to be vigilant when meeting new people, try to meet in trusted locations and ensure each person is who they say they are.</Text>
          </View>
        </View>
        <View style={welcomeStyles.rule}>
          <Image source={tickIcon} style={welcomeStyles.tickIcon} />
          <View style={welcomeStyles.ruleContent}>
            <Text style={welcomeStyles.ruleTitle}>Be Respectful</Text>
            <Text style={welcomeStyles.ruleText}>In martial arts, one of core tenets is respect. Treat others how you would wish to be treated and be respectful to all members.</Text>
          </View>
        </View>
        <View style={welcomeStyles.rule}>
          <Image source={tickIcon} style={welcomeStyles.tickIcon} />
          <View style={welcomeStyles.ruleContent}>
            <Text style={welcomeStyles.ruleTitle}>Be Proactive</Text>
            <Text style={welcomeStyles.ruleText}>Make sure to rate and report people where necessary, this helps to foster a safe environment for all.</Text>
          </View>
        </View>
      </View>
      <Text style={welcomeStyles.termsAndConditions}>By pressing I agree, you are agreeing to our Terms and Conditions and Privacy Policy.</Text>
      {/* <TouchableOpacity style={welcomeStyles.agreeButton} onPress={() => navigation.navigate('AvoidContact')}>
        <Text style={welcomeStyles.agreeButtonText}>I Agree</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
      style={welcomeStyles.agreeButton}
      onPress={() => {
        console.log('User ID:', userId); // print the user ID
        navigation.navigate('AvoidContact');
      }}
    >
      <Text style={welcomeStyles.agreeButtonText}>I Agree</Text>
    </TouchableOpacity>
    </View>
  );
};

export default Welcome;
