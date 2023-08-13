import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { settingsStyles, fightingStyleScreen } from './styles2'

const SettingSection = ({ title, onPress, titleInsideRectangle = false, preference, settingButton = false, showChevron = false }) => {
  
  

  return (
    <View style={settingsStyles.sectionContainer}>
      {!titleInsideRectangle && !settingButton ? <Text style={settingsStyles.sectionTitle}>{title}</Text> : null}

      <TouchableOpacity
        style={settingsStyles.sectionRectangle}
        onPress={onPress}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "95%"}}>
          {titleInsideRectangle ?
            <Text style={[settingsStyles.sectionTitle, fightingStyleScreen.rectangleText]}>{title}</Text>
            : null
          }
          {preference ?
            <Text style={settingsStyles.preferenceText}>{preference}</Text>
            : <Text style={settingsStyles.preferenceText}>Loading...</Text>
          }
          {showChevron ? <Icon name="chevron-right" size={15} style={{color: "white"}}/> : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingSection;