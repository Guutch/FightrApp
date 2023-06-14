import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import boxingIcon from '../../assets/boxing-glove-icon2.png';
import { welcomeStyles } from '../../components/styles2';

const MessagingScreen = ({ navigation }) => {

  return (
    <View style={welcomeStyles.container}>
       <Navbar navigation={navigation} backgroundColor="#FFFFFF" textColor="#000000" homeStyle={true} />

      <Image source={boxingIcon} style={welcomeStyles.boxingIcon} />
      
      <Text style={welcomeStyles.welcomeText}>A little waiver before getting started...</Text>

      <View style={welcomeStyles.waiverBox}>
        <ScrollView contentContainerStyle={welcomeStyles.waiverContent}>
          <Text>
            {/* The waiver text goes here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu laoreet metus. Nulla sit amet semper arcu...
          </Text>
        </ScrollView>
      </View>

      <Text style={welcomeStyles.termsAndConditions}>You can learn more about how Fytr processes your contacts here.</Text>

      <TouchableOpacity style={welcomeStyles.agreeButton} onPress={() => {navigation.navigate('AvoidContact')}}>
        <Text style={welcomeStyles.agreeButtonText}>I Agree</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessagingScreen;
