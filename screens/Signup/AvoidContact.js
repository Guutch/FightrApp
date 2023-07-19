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
 <Navbar backgroundColor="#000000"
        textColor="#FFFFFF"
        showBackButton={false}
        showNextButton={false}
        />

      <Image source={boxingIcon} style={welcomeStyles.boxingIcon} />
      <Text style={welcomeStyles.welcomeText}>Want to avoid somebody on Fytr?</Text>
      <Text style={welcomeStyles.subText}>We understand you want to get straight into smashing, but first, some rules.</Text>
      <Text style={welcomeStyles.avoidText}>
  It’s simple. Simply share your devices contacts with us, and tick any contacts 
  you wish to avoid We will store this information and ensure you don’t match 
  with anyone with the data you provided.
</Text>
      <Text style={welcomeStyles.termsAndConditions}>You can learn more about how Fytr processess your contacts here.</Text>
      <TouchableOpacity
      style={welcomeStyles.agreeButton}
      onPress={() => {
        console.log('User ID:', userId); // print the user ID
        navigation.navigate('MainFlow');
      }}
    >
      <Text style={welcomeStyles.agreeButtonText}>I Agree</Text>
    </TouchableOpacity>
    </View>
  );
};

export default Welcome;
