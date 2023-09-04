import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import Navbar from '../../components/Navbar';
import PopUp from '../../components/PopUp';
import ChatMessage from '../../components/ChatMessage';
import { matchedUsersInterface } from '../../components/styles2';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage as sendMessageAction } from '../../redux/actions';
import { saveMessageToDatabase } from '../../api';
import { getWebSocketInstance } from '../../Backend/websocketInstance'


const RealTimeMessaging = ({ route, navigation }) => {
    const { selectedUser, relevantMessages, userId } = route.params;
    console.log(userId)
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);  // New state to hold messages

    const ws = getWebSocketInstance();
    // console.log("ws", ws)

    const dispatch = useDispatch();
    
    // Inside RealTimeMessaging component
    useEffect(() => {
        console.log(userId)
        if (ws) {
            console.log("ws is true")

          ws.onmessage = (event) => {
            //   console.log("event", event)
            const messageData = JSON.parse(event.data);
            // console.log("messageData", messageData)
            if (messageData.type === 'chat') {
              setChatMessages((prevMessages) => [...prevMessages, { message: messageData.content, isSent: false }]);
            }
          };
        } else {
            console.log("ws is false")
        }
        
      }, [ws]);
      
  
    

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

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
      
    

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Navbar navigation={navigation}
                title={selectedUser.name}
                backgroundColor="#000000"
                textColor="#FFFFFF"
                showLockIcon={true}
                onLockPress={togglePopup}
                showBackButton={true}
            />
            <PopUp
                isVisible={isPopupVisible}
                onClose={togglePopup}
                options={[
                    { preference: 'Unmatch user' },
                    { preference: 'Report user' },
                    { preference: 'Block user' }
                ]}
            />
          <View style={[matchedUsersInterface.mainContainer, { justifyContent: 'flex-end' }]}>
          <FlatList
    data={chatMessages}
    renderItem={({ item }) => <ChatMessage message={item.message} isSent={item.isSent} />}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}  // Apply the style here
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
