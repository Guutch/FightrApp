import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Navbar from '../../components/Navbar';
import boxingIcon from '../../assets/boxing-glove-icon2.png';
import tickIcon from '../../assets/FightrTick.png';
import { welcomeStyles } from '../../components/styles2';

const Welcome = ({ navigation }) => {
  return (
    <View style={welcomeStyles.container}>
<Navbar showBackButton={false} showNextButton={false} />

      <Image source={boxingIcon} style={welcomeStyles.boxingIcon} />
      <Text style={welcomeStyles.welcomeText}>Want to avoid somebody on Fytr?</Text>
      <Text style={welcomeStyles.subText}>We understand you want to get straight into smashing, but first, some rules.</Text>
      <Text style={welcomeStyles.avoidText}>
  It’s simple. Simply share your devices contacts with us, and tick any contacts 
  you wish to avoid We will store this information and ensure you don’t match 
  with anyone with the data you provided.
</Text>
      <Text style={welcomeStyles.termsAndConditions}>You can learn more about how Fytr processess your contacts here.</Text>
      <TouchableOpacity style={welcomeStyles.agreeButton} onPress={() => navigation.navigate('SomeScreen')}>
        <Text style={welcomeStyles.agreeButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
