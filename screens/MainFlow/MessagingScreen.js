import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import Navbar from '../../components/Navbar';
import MatchesDisplay from '../../components/MatchesDisplay';
import { settingsStyles, matchedUsersInterface, photosScreen } from '../../components/styles2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMatches, fetchImage, fetchName, fetchMessages, markMessagesAsRead } from '../../api'
import { getWebSocketInstance } from '../../Backend/websocketInstance'
import { getShouldRefresh, setShouldRefresh, setChatId, getChatId, getshouldRefreshMatches, setshouldRefreshMatches} from '../../sharedState'

const MessagingScreen = ({ navigation }) => {
  // const [shouldRefreshMatches, setShouldRefreshMatches] = useShouldRefreshMatches();
  const [matches, setMatches] = useState([]);
  // const [messages, setMessages] = useState([]);
  const userId = useSelector(state => state.user);
  const ws = getWebSocketInstance();
  const [readChats, setReadChats] = useState({});


  const navigateToChat = async (selectedUser, userId) => {
    setChatId(selectedUser.id);
    setReadChats(prevReadChats => ({ ...prevReadChats, [selectedUser.id]: true }));
    console.log("readChats", readChats)
    try {
      // SenderId, receiverId
      await markMessagesAsRead(selectedUser.id, userId);
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
    // console.log(matches)
    console.log(matches)
    navigation.navigate('RealTimeMessaging', { selectedUser: selectedUser, userId });
  };

  ws.onmessage = async (event) => {
    // Parse the received WebSocket message
    const messageData = JSON.parse(event.data);

    console.log("messageData", messageData)

    // Check if the message type is 'new_message_notification'
    // if (messageData.type === 'new_message_notification') {
    if (messageData.type === 'chat') {
      console.log("NEW MESSAGE RECEIVED")
      // Set the flag indicating a new message has been received
      // setNewMessageReceived(true);

      setReadChats(prevReadChats => ({ ...prevReadChats, [messageData.senderId]: false }));
      setMatches(prevMatches => {
        return prevMatches.map(match => {
          if (match.id === messageData.senderId) {
            return {
              ...match,
              lastMessage: messageData.content,  // Update the last message content
              read: false  // Set read status to false as this is a new message
            };
          }
          return match;
        });
      });
    }
  };

  // First UseEffect called - Asynchronous function to fetch all necessary data
  const fetchData = async () => {
    // Fetch all matches for the current user
    const matches = await fetchAllMatches(userId.userId);

    // Extract the IDs of users that the current user has matched with
    const matchedUserIds = matches.map(match => {
      if (String(match.user1_id) === String(userId.userId)) {
        return String(match.user2_id);
      } else if (String(match.user2_id) === String(userId.userId)) {
        return String(match.user1_id);
      }
    }).filter(id => id);  // Remove any undefined values

    // Fetch additional data for each matched user
    const fetchPromises = matchedUserIds.map(async (id) => {
      // Fetch image, name, and last message concurrently
      const [imageData, nameData, lastMessage] = await Promise.all([
        fetchImage(id),
        fetchName(id),
        fetchMessages(userId.userId, id, true),  // Fetch only the last message
      ]);

      // Extract the first name from the full name
      const firstName = nameData.fullName.split(' ')[0];

      console.log(lastMessage[0].read)

      // Construct an object for each matched user
      return {
        id,
        image: imageData.imageUrl,
        name: firstName,
        lastMessage: lastMessage[0]?.content || '',  // Use the content of the last message, if available
        read: lastMessage[0].read,  // Use the read status of the last message, default to true
      };
    });

    

    // Wait for all fetch operations to complete and update the state
    const matchedUsersData = await Promise.all(fetchPromises);
    setMatches(matchedUsersData);
  };


  console.log("state of matches", matches[1])

  // First UseEffect called - useEffect hook to run fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);  // Empty dependency array ensures this runs only once after initial render

  // Used to refresh last message sent in the last chat they were in
  // useEffect hook to handle screen focus events. Will be executed whenever the user navigates to this screen from anywhere
  useEffect(() => {
    // Add a listener for the 'focus' event on the navigation object
    const focusListener = navigation.addListener('focus', () => {
      // Check if last message should refresh when it comes into focus
      if (getShouldRefresh()) {
        if (ws) {
          console.log("ws is still there")
        } else {
          console.log("ws is not there")
        }
        // Execute an asynchronous function
        (async () => {
          // Retrieve the chat ID from the shared state
          const chatId = getChatId();

          // Fetch the last message for the specific chat
          const lastMessage = await fetchMessages(userId.userId, chatId, true);
          console.log("focusListener - Last message read status: ", lastMessage[0]?.read);  // Debugging line
          // Update the 'matches' state with the new last message for the specific chat
          setMatches(prevMatches => {
            return prevMatches.map(match => {
              if (match.id === chatId) {
                return { ...match, lastMessage: lastMessage[0]?.content || '' };
              }
              return match;
            });
          });

          // Reset the refresh flag
          setShouldRefresh(false);
        })();
      } else {
        if (getshouldRefreshMatches()) {
          const userIdToRemove = getChatId();
          const updatedMatches = matches.filter(match => match.id !== userIdToRemove);
          setMatches(updatedMatches);
          setshouldRefreshMatches(false);  // Reset the flag
        }
        
      }
    });

    // Cleanup: Remove the focus listener when the component unmounts
    return () => {
      focusListener();
    };
  }, []);  // Empty dependency array ensures this runs only once after initial render


  // console.log("Current matches state before render: ", matches);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Navbar navigation={navigation} backgroundColor="#FFFFFF" textColor="#000000" homeStyle={true} />
      <View style={matchedUsersInterface.mainContainer}>
{/* Scenario 1: No matches & No messages */}
{matches.length === 0 && (
          <View style={matchedUsersInterface.centeredTextContainer}>
            <Text style={matchedUsersInterface.mainText}>Get To Swiping</Text>
            <Text style={matchedUsersInterface.subText}>Messages and Matches will show up here</Text>
          </View>
        )}

{/* Scenario 2: Match(es) & No messages */}
{matches.length > 0 && !matches.some(match => match.lastMessage) && (
          <View style={{ flex: 1 }}>
            <MatchesDisplay matches={matches} navigateToChat={(selectedUser) => navigateToChat(selectedUser, userId.userId)} />

            <View style={{ flex: 0.7 }}>
              <Text style={settingsStyles.sectionTitle}>Messages</Text>
              <View style={matchedUsersInterface.centeredTextContainer}>
                <Text style={matchedUsersInterface.mainText}>No Messages</Text>
                <Text style={matchedUsersInterface.subText}>Start a conversation</Text>
              </View>
            </View>
          </View>
        )}

{/* Scenario 3: Match(es) & message(s) */}
{matches.length > 0 && matches.some(match => match.lastMessage) && (
          <View style={{ flex: 1 }}>
            <MatchesDisplay matches={matches} navigateToChat={(selectedUser) => navigateToChat(selectedUser, userId.userId)} />

            <View style={{ flex: 0.7 }}>
              <Text style={settingsStyles.sectionTitle}>Messages</Text>
              <FlatList
                data={matches}
                renderItem={({ item }) => (
                  item.lastMessage ? (
                    <TouchableOpacity onPress={() => navigateToChat(item, userId.userId)}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                          {/* {!item.read && <View style={matchedUsersInterface.redDot}></View>} */}
                          {!readChats[item.id] && !item.read && <View style={matchedUsersInterface.redDot}></View>}
                        </View>
                        <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>

                          <Text>
                            {item.lastMessage.length > 40 ? `${item.lastMessage.substring(0, 40)}...` : item.lastMessage}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : null
                )}
                keyExtractor={item => item.id}
              />




            </View>
          </View>
        )}

      </View>
    </View>
  );
};

export default MessagingScreen;