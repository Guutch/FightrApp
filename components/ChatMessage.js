import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { chatMessageStyles } from '../components/styles2';

const ChatMessage = ({ message, isSent }) => {
  return (
    <View style={[chatMessageStyles.messageContainer, isSent ? chatMessageStyles.sent : chatMessageStyles.received]}>
      <Text style={chatMessageStyles.messageText}>{message}</Text>
    </View>
  );
};

export default ChatMessage;