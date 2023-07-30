import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { swipingStyles, noUsersStyles } from './styles2';

const NoUsersCard = () => {
  return (
    <View style={swipingStyles.cardContainer}>
      <View style={[swipingStyles.cardImage, {backgroundColor: "#000"}]}>
      <Text style={noUsersStyles.noUsersText}>There are no more Fytrs in your area.</Text>
      <Icon name="globe" size={30} color="#fff" style={noUsersStyles.worldIcon} />
      </View>
    </View>
  );
};

export default NoUsersCard;
