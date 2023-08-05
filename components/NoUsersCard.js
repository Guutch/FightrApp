import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { settingsStyles, swipingStyles, noUsersStyles } from './styles2';

import { useNavigation } from '@react-navigation/native';

const NoUsersCard = () => {
  const navigation = useNavigation();

  const navigateToSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  return (
    <View style={swipingStyles.cardContainer}>
      <View style={[swipingStyles.cardImage, {backgroundColor: "#0f0f0f", justifyContent: 'space-around', alignItems: 'center', padding: 20}]}>
        <Text style={noUsersStyles.noUsersText}>There are no more Fytrs in your area.</Text>
        <Icon name="globe" size={90} color="#fff" style={noUsersStyles.worldIcon} />
        <Text style={noUsersStyles.preferencesText}>Why don’t you broaden your preferences?</Text>
        <TouchableOpacity onPress={navigateToSettings}>
          <View style={noUsersStyles.rectangle}>
            <Text style={noUsersStyles.insideRectangleText}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};






export default NoUsersCard;
