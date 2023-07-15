// ProgressBar.js
import React from 'react';
import { View, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProgressBar = ({ progress }) => {
  return (
    <View style={{ width: screenWidth * 0.95, height: 4, backgroundColor: '#D9D9D9', borderRadius: 2, alignSelf: 'center', marginTop: screenHeight * 0.11 }}>
      <View style={{ width: `${progress * 100}%`, height: '100%', backgroundColor: 'black' }} />
    </View>
  );
};

export default ProgressBar;
