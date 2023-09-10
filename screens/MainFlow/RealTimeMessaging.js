import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import Navbar from '../../components/Navbar';
import PopUp from '../../components/PopUp';
import ChatMessage from '../../components/ChatMessage';
import { matchedUsersInterface } from '../../components/styles2';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage as sendMessageAction } from '../../redux/actions';
import { saveMessageToDatabase, fetchMessages, markMessagesAsRead } from '../../api';
import { getWebSocketInstance } from '../../Backend/websocketInstance'
import { setShouldRefresh } from '../../sharedState'


const RealTimeMessaging = ({ route, navigation }) => {
  const { selectedUser, userId, setRefreshData } = route.params;
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);  // New state to hold messages

  const ws = getWebSocketInstance();
  // console.log("ws", ws)

  const dispatch = useDispatch();

    // Mark messages as read when returning to the previous screen
    const markRead = async () => {
      try {
        await markMessagesAsRead(userId, selectedUser.id);
      } catch (error) {
        console.error("Failed to mark messages as read:", error);
      }
    };

  // Inside RealTimeMessaging component
  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const fetchedMessages = await fetchMessages(userId, selectedUser.id);
        setChatMessages(fetchedMessages.map(msg => ({ message: msg.content, isSent: msg.sender_id === userId })));
      } catch (error) {
        console.error("Failed to fetch initial messages:", error);
      }
    };

    fetchInitialMessages();



    if (ws) {
      console.log("ws is true");

      ws.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        if (messageData.type === 'chat') {
          setChatMessages((prevMessages) => [...prevMessages, { message: messageData.content, isSent: messageData.sender_id === userId }]);
        }
      };
    } else {
      console.log("ws is false");
    }

  }, [ws, userId, selectedUser.id]);

  const handleSendMessage = async () => {
    // Dispatch the message to be sent via WebSocket
    dispatch(sendMessageAction(message, selectedUser.id));  // Include the recipientId

    // Save the message to the database
    try {
      await saveMessageToDatabase(userId, selectedUser.id, message);
    } catch (error) {
      console.error("Failed to save message:", error);
    }

    // Update the local state to display the message
    setChatMessages([...chatMessages, { message, isSent: true }]);

    // Clear the input field
    setMessage('');
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
    setSelectedPreference(null);  // Reset to original state
  };

  const handlePreferenceClick = (preference) => {
    if (preference === 'No') {
      setSelectedPreference(null);  // Reset to original state
    } else {
      setSelectedPreference(preference);
    }
  };

  const options = selectedPreference
    ? [{ preference: 'Yes' }, { preference: 'No' }]
    : [
      { preference: 'Unmatch user' },
      { preference: 'Report user' },
      { preference: 'Block user' }
    ];

    const flatListRef = useRef(null);

    const handleLayout = () => {
      if (chatMessages.length > 0 && flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: false });
      }
    };
    

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Navbar navigation={navigation}
        title={selectedUser.name}
        backgroundColor="#000000"
        textColor="#FFFFFF"
        showLockIcon={true}
        onLockPress={togglePopup}
        showBackButton={true}
        onBackPressCustom={() => {
          markRead()
          console.log("RealTIme")
          setShouldRefresh(true);  // Set the shared state
          navigation.goBack();
        }}
      />
      <PopUp
        isVisible={isPopupVisible}
        onClose={togglePopup}
        options={options}
        selectedPreference={selectedPreference}
        onPreferenceClick={handlePreferenceClick}
      />
      <View style={[matchedUsersInterface.mainContainer, { justifyContent: 'flex-end' }]}>
      <FlatList
      ref={flatListRef}
      data={chatMessages}
      renderItem={({ item }) => <ChatMessage message={item.message} isSent={item.isSent} />}
      keyExtractor={(item, index) => index.toString()}
      onLayout={handleLayout}
      onContentSizeChange={handleLayout}
    />

      </View>

      <View style={matchedUsersInterface.textInputContainer}>
        <TextInput
          style={matchedUsersInterface.textInput}
          placeholder="Type a message..."
          value={message}
          onChangeText={text => setMessage(text)}
          onSubmitEditing={handleSendMessage}
        />
        <Text
          style={matchedUsersInterface.sendText}
          onPress={handleSendMessage}
        >
          SEND
        </Text>
      </View>
    </View>
  );
};

export default RealTimeMessaging;
