import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import boxingIcon from '../../assets/boxing-glove-icon2.png';
import { swipingStyles } from '../../components/styles2';

const SwipingScreen = ({ navigation }) => {

  return (
    <View>
      <Navbar navigation={navigation} backgroundColor="#FFFFFF" textColor="#000000" homeStyle={true} />
      <View style={swipingStyles.container}>
  <View style={swipingStyles.cardContainer}>
    <View style={swipingStyles.card2}>
      {/* Here, your card2 details will go */}
    </View>
    <View style={swipingStyles.card1}>
      {/* Here, your card1 details will go */}
    </View>
  </View>
</View>

      
    </View>
  );
};

export default SwipingScreen;
