// ProgressBar.js
import React from 'react';
import { View, Dimensions } from 'react-native';
import { progressBarStyles } from './styles2';

const ProgressBar = ({ progress, isInsideCard, viewProfile = false }) => {
  return (
<View style={[
  isInsideCard ? progressBarStyles.progressBarContainerInsideCard : progressBarStyles.progressBarContainer,
  viewProfile === true ? { marginTop: 15 } : {  }
]}>
      <View style={[progressBarStyles.progressBar, { width: `${progress * 100}%` }]} />
    </View>
  );
};



export default ProgressBar;
