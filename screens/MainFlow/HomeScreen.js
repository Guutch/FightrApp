import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import boxingIcon from '../../assets/boxing-glove-icon2.png';
import { welcomeStyles } from '../../components/styles2';


const HomeScreen = ({ navigation }) => {
  
  
  return (
    <View style={welcomeStyles.container}>
      <Navbar navigation={navigation} backgroundColor="#FFFFFF" textColor="#000000" homeStyle={true} />
  
      <View style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000' // black background
      }}>
        <View style={{
          position: 'absolute',
          height: 200,
          width: 200,
          backgroundColor: 'red' // red rectangle
        }} />
        <View style={{
          position: 'absolute',
          height: 150,
          width: 150,
          backgroundColor: 'blue' // blue rectangle
        }} />
      </View>
    </View>
  );
  
};

export default HomeScreen;
