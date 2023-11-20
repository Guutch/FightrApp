import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { settingsStyles, matchedUsersInterface, photosScreen } from '../components/styles2';

const MatchesDisplay = ({ matches, navigateToChat }) => {
  return (
    <View style={{ flex: 0.35 }}>
      <Text style={[settingsStyles.sectionTitle, matchedUsersInterface.matchesAndMessages, {paddingBottom: 8}]}>Matches</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {matches.map(match => (
          <TouchableOpacity key={match.id} onPress={() => navigateToChat(match)}>
            <Image
              source={{ uri: match.image }}
              style={[photosScreen.photosrectangle, photosScreen.extendedPhotosRectangle]}
              // resizeMode="stretch"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MatchesDisplay;

