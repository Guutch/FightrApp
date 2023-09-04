import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { settingsStyles, matchedUsersInterface, photosScreen } from '../components/styles2';

const MatchesDisplay = ({ matches, navigateToChat }) => {
    return (
      <View style={{ flex: 0.3 }}>
        <Text style={settingsStyles.sectionTitle}>Matches</Text>
        <ScrollView horizontal>
          {matches.map(match => (
            <TouchableOpacity key={match.id} onPress={() => navigateToChat(match)}>
              <Image source={{ uri: match.image }} style={photosScreen.photosrectangle} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

export default MatchesDisplay;
  